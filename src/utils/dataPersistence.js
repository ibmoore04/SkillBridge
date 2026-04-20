// Data Persistence System - Auto-save user data to files
import { getAllUsers, getCurrentSession, getCurrentUserSession, getAuthStatus, getCurrentUserEmail } from './userDataManager.js';

// Data storage configuration
const DATA_CONFIG = {
  usersFile: '/data/users.json',
  sessionsFile: '/data/sessions.json',
  backupsDir: '/data/backups/',
  autoSave: true,
  backupInterval: 24 * 60 * 60 * 1000, // 24 hours
  maxBackups: 7
};

// Initialize data directory structure
const initializeDataDirectory = async () => {
  try {
    // In a real Node.js environment, you'd use fs.mkdir
    // For browser environment, we'll use IndexedDB as fallback
    console.log('Initializing data persistence system...');
    return true;
  } catch (error) {
    console.error('Failed to initialize data directory:', error);
    return false;
  }
};

// Save data to browser storage (IndexedDB fallback)
const saveToBrowserStorage = async (key, data) => {
  try {
    // Use localStorage for simplicity (in production, consider IndexedDB)
    const timestampedData = {
      data: data,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    localStorage.setItem(`persisted_${key}`, JSON.stringify(timestampedData));
    return true;
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
    return false;
  }
};

// Load data from browser storage
const loadFromBrowserStorage = (key) => {
  try {
    const stored = localStorage.getItem(`persisted_${key}`);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored);
    return parsed.data;
  } catch (error) {
    console.error(`Failed to load ${key}:`, error);
    return null;
  }
};

// Auto-save all user data
const autoSaveUserData = async () => {
  if (!DATA_CONFIG.autoSave) return false;

  try {
    const userData = {
      users: getAllUsers(),
      currentSession: getCurrentSession(),
      currentUserSession: getCurrentUserSession(),
      isLoggedIn: getAuthStatus(),
      currentUserEmail: getCurrentUserEmail(),
      lastUpdated: new Date().toISOString()
    };

    // Save to browser storage
    await saveToBrowserStorage('allUserData', userData);
    
    // Save individual data types
    await saveToBrowserStorage('users', userData.users);
    await saveToBrowserStorage('sessions', {
      currentSession: userData.currentSession,
      currentUserSession: userData.currentUserSession,
      isLoggedIn: userData.isLoggedIn,
      currentUserEmail: userData.currentUserEmail
    });

    console.log('User data auto-saved successfully');
    return true;
  } catch (error) {
    console.error('Auto-save failed:', error);
    return false;
  }
};

// Load persisted data on app startup
const loadPersistedData = async () => {
  try {
    const persistedUsers = loadFromBrowserStorage('users');
    const persistedSessions = loadFromBrowserStorage('sessions');
    
    if (persistedUsers && persistedUsers.length > 0) {
      // Merge with localStorage data, preferring persisted data
      const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const mergedUsers = [...new Set([...persistedUsers, ...localUsers])];
      localStorage.setItem('users', JSON.stringify(mergedUsers));
    }

    if (persistedSessions) {
      // Restore session data if not currently logged in
      if (!localStorage.getItem('sessionUser') && persistedSessions.currentSession) {
        localStorage.setItem('sessionUser', JSON.stringify(persistedSessions.currentSession));
      }
      if (!localStorage.getItem('userSession') && persistedSessions.currentUserSession) {
        localStorage.setItem('userSession', JSON.stringify(persistedSessions.currentUserSession));
      }
      if (!localStorage.getItem('isLoggedIn') && persistedSessions.isLoggedIn) {
        localStorage.setItem('isLoggedIn', persistedSessions.isLoggedIn);
      }
      if (!localStorage.getItem('currentUserEmail') && persistedSessions.currentUserEmail) {
        localStorage.setItem('currentUserEmail', persistedSessions.currentUserEmail);
      }
    }

    console.log('Persisted data loaded successfully');
    return true;
  } catch (error) {
    console.error('Failed to load persisted data:', error);
    return false;
  }
};

// Create backup of current data
const createBackup = async () => {
  try {
    const backupData = {
      timestamp: new Date().toISOString(),
      users: getAllUsers(),
      currentSession: getCurrentSession(),
      currentUserSession: getCurrentUserSession(),
      isLoggedIn: getAuthStatus(),
      currentUserEmail: getCurrentUserEmail(),
      appVersion: '1.0.0'
    };

    const backupKey = `backup_${new Date().toISOString().split('T')[0]}`;
    await saveToBrowserStorage(backupKey, backupData);
    
    console.log(`Backup created: ${backupKey}`);
    return backupKey;
  } catch (error) {
    console.error('Backup creation failed:', error);
    return null;
  }
};

// Clean old backups
const cleanOldBackups = async () => {
  try {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('backup_'));
    const sortedKeys = keys.sort().reverse(); // Most recent first
    
    // Keep only the most recent backups
    const keysToKeep = sortedKeys.slice(0, DATA_CONFIG.maxBackups);
    const keysToRemove = sortedKeys.slice(DATA_CONFIG.maxBackups);
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    console.log(`Cleaned ${keysToRemove.length} old backups`);
    return true;
  } catch (error) {
    console.error('Backup cleanup failed:', error);
    return false;
  }
};

// Export data as downloadable file
const exportDataToFile = async () => {
  try {
    const userData = {
      users: getAllUsers(),
      currentSession: getCurrentSession(),
      currentUserSession: getCurrentUserSession(),
      isLoggedIn: getAuthStatus(),
      currentUserEmail: getCurrentUserEmail(),
      exportDate: new Date().toISOString(),
      appVersion: '1.0.0'
    };

    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `user-data-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    console.log('Data exported to file successfully');
    return true;
  } catch (error) {
    console.error('Export failed:', error);
    return false;
  }
};

// Initialize auto-save system
const initializeAutoSave = () => {
  // Load persisted data on startup
  loadPersistedData();
  
  // Set up auto-save interval
  setInterval(autoSaveUserData, 5 * 60 * 1000); // Save every 5 minutes
  
  // Set up backup interval
  setInterval(() => {
    createBackup();
    cleanOldBackups();
  }, DATA_CONFIG.backupInterval);
  
  // Save data before page unload
  window.addEventListener('beforeunload', autoSaveUserData);
  
  console.log('Auto-save system initialized');
};

// Manual save function
const saveDataNow = async () => {
  return await autoSaveUserData();
};

// Get persistence status
const getPersistenceStatus = () => {
  return {
    autoSaveEnabled: DATA_CONFIG.autoSave,
    lastBackup: localStorage.getItem('lastBackupTime'),
    totalBackups: Object.keys(localStorage).filter(key => key.startsWith('backup_')).length,
    dataExists: !!localStorage.getItem('persisted_allUserData')
  };
};

export {
  initializeAutoSave,
  autoSaveUserData,
  loadPersistedData,
  createBackup,
  cleanOldBackups,
  exportDataToFile,
  saveDataNow,
  getPersistenceStatus,
  initializeDataDirectory
};
