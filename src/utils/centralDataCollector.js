// Central Data Collector - Captures user data from anywhere
import { getAllUsers, getCurrentSession, getCurrentUserSession, getAuthStatus, getCurrentUserEmail } from './userDataManager.js';

class CentralDataCollector {
  constructor() {
    this.dataFile = '/data/users.json';
    this.syncEndpoint = 'http://localhost:3001/api/sync'; // Local server endpoint
    this.isOnline = navigator.onLine;
    this.lastSync = null;
    this.pendingSyncs = [];
    
    // Initialize event listeners
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncPendingData();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Auto-sync every 30 seconds
    setInterval(() => {
      if (this.isOnline) {
        this.syncData();
      }
    }, 30000);
  }

  // Collect all user data from current browser
  collectUserData() {
    const userData = {
      source: {
        browser: navigator.userAgent,
        timestamp: new Date().toISOString(),
        sessionId: this.generateSessionId(),
        location: window.location.href,
        ipAddress: null // Will be filled by server
      },
      users: getAllUsers(),
      currentSession: getCurrentSession(),
      currentUserSession: getCurrentUserSession(),
      isLoggedIn: getAuthStatus(),
      currentUserEmail: getCurrentUserEmail(),
      statistics: {
        totalUsers: getAllUsers().length,
        currentlyLoggedIn: getAuthStatus(),
        lastActivity: new Date().toISOString()
      }
    };

    return userData;
  }

  // Generate unique session ID
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Save data to local file (simulated - in real app would use server)
  async saveToLocalFile(userData) {
    try {
      // Get existing data
      const existingData = await this.loadLocalFile();
      
      // Merge new data
      const mergedData = this.mergeUserData(existingData, userData);
      
      // Save to localStorage as file simulation
      localStorage.setItem('centralUserData', JSON.stringify(mergedData, null, 2));
      
      console.log('Data saved to local file simulation');
      return true;
    } catch (error) {
      console.error('Failed to save to local file:', error);
      return false;
    }
  }

  // Load data from local file simulation
  async loadLocalFile() {
    try {
      const stored = localStorage.getItem('centralUserData');
      return stored ? JSON.parse(stored) : {
        lastUpdated: new Date().toISOString(),
        totalUsers: 0,
        users: [],
        sessions: [],
        statistics: {
          totalRegistrations: 0,
          totalLogins: 0,
          activeUsers: 0,
          lastActivity: null
        }
      };
    } catch (error) {
      console.error('Failed to load local file:', error);
      return this.getEmptyDataStructure();
    }
  }

  // Get empty data structure
  getEmptyDataStructure() {
    return {
      lastUpdated: new Date().toISOString(),
      totalUsers: 0,
      users: [],
      sessions: [],
      statistics: {
        totalRegistrations: 0,
        totalLogins: 0,
        activeUsers: 0,
        lastActivity: null
      }
    };
  }

  // Merge user data from different sources
  mergeUserData(existingData, newData) {
    const merged = { ...existingData };
    
    // Merge users (avoid duplicates by email)
    const existingEmails = new Set(merged.users.map(u => u.email));
    const newUsers = newData.users.filter(u => !existingEmails.has(u.email));
    
    merged.users = [...merged.users, ...newUsers];
    merged.totalUsers = merged.users.length;
    
    // Add session
    if (newData.currentSession || newData.isLoggedIn) {
      merged.sessions.push({
        ...newData.source,
        sessionData: newData.currentSession,
        timestamp: new Date().toISOString()
      });
    }
    
    // Update statistics
    merged.statistics.totalRegistrations = merged.users.length;
    merged.statistics.totalLogins = merged.sessions.length;
    merged.statistics.activeUsers = merged.sessions.filter(s => 
      new Date(s.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    ).length;
    merged.statistics.lastActivity = new Date().toISOString();
    merged.lastUpdated = new Date().toISOString();
    
    return merged;
  }

  // Sync data to central server
  async syncData() {
    if (!this.isOnline) {
      console.log('Offline - data queued for sync');
      return false;
    }

    try {
      const userData = this.collectUserData();
      
      // Save locally first
      await this.saveToLocalFile(userData);
      
      // Try to sync to server (simulated)
      const syncSuccess = await this.syncToServer(userData);
      
      if (syncSuccess) {
        this.lastSync = new Date().toISOString();
        console.log('Data synced successfully');
        return true;
      } else {
        console.log('Server sync failed, data saved locally');
        return false;
      }
    } catch (error) {
      console.error('Sync failed:', error);
      return false;
    }
  }

  // Sync to server (real API call)
  async syncToServer(userData) {
    try {
      const response = await fetch(this.syncEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Server sync successful:', result);
        return true;
      } else {
        console.error('Server sync failed:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Server sync error:', error);
      return false;
    }
  }

  // Sync pending data when coming back online
  async syncPendingData() {
    console.log('Coming back online - syncing pending data');
    await this.syncData();
  }

  // Get all collected data
  async getAllCollectedData() {
    return await this.loadLocalFile();
  }

  // Export all data to downloadable file
  async exportAllData() {
    try {
      const allData = await this.getAllCollectedData();
      const dataStr = JSON.stringify(allData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `all-user-data-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
      console.log('All user data exported successfully');
      return true;
    } catch (error) {
      console.error('Export failed:', error);
      return false;
    }
  }

  // Get statistics
  async getStatistics() {
    const data = await this.getAllCollectedData();
    return {
      ...data.statistics,
      totalSessions: data.sessions.length,
      uniqueBrowsers: [...new Set(data.sessions.map(s => s.source.browser))].length,
      lastSync: this.lastSync,
      isOnline: this.isOnline
    };
  }

  // Force immediate sync
  async forceSync() {
    return await this.syncData();
  }
}

// Create global instance
const centralCollector = new CentralDataCollector();

// Make available globally
window.centralDataCollector = centralCollector;

// Auto-sync on user actions
window.addEventListener('storage', (e) => {
  if (e.key === 'users' || e.key === 'sessionUser' || e.key === 'isLoggedIn') {
    centralCollector.syncData();
  }
});

export { centralCollector };
export default centralCollector;
