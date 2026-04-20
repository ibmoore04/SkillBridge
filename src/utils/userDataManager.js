// User Data Manager - Access all user data
const USER_STORAGE_KEY = "users";
const SESSION_KEY = "sessionUser";
const USER_SESSION_KEY = "userSession";
const AUTH_STORAGE_KEY = "isLoggedIn";
const CURRENT_USER_KEY = "currentUserEmail";

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

// Get all registered users
export const getAllUsers = () => {
  return safeParse(localStorage.getItem(USER_STORAGE_KEY)) || [];
};

// Get current session data
export const getCurrentSession = () => {
  return safeParse(localStorage.getItem(SESSION_KEY));
};

// Get current user session
export const getCurrentUserSession = () => {
  return safeParse(localStorage.getItem(USER_SESSION_KEY));
};

// Get authentication status
export const getAuthStatus = () => {
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
};

// Get current user email
export const getCurrentUserEmail = () => {
  return localStorage.getItem(CURRENT_USER_KEY);
};

// Get comprehensive user data
export const getAllUserData = () => {
  return {
    allUsers: getAllUsers(),
    currentSession: getCurrentSession(),
    currentUserSession: getCurrentUserSession(),
    isLoggedIn: getAuthStatus(),
    currentUserEmail: getCurrentUserEmail(),
    totalUsers: getAllUsers().length,
    storageKeys: {
      users: USER_STORAGE_KEY,
      session: SESSION_KEY,
      userSession: USER_SESSION_KEY,
      auth: AUTH_STORAGE_KEY,
      currentUser: CURRENT_USER_KEY
    }
  };
};

// Export user data to JSON
export const exportUserData = () => {
  const userData = getAllUserData();
  const dataStr = JSON.stringify(userData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `user-data-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  URL.revokeObjectURL(url);
};

// Clear all user data (use with caution)
export const clearAllUserData = () => {
  const keys = [
    USER_STORAGE_KEY,
    SESSION_KEY,
    USER_SESSION_KEY,
    AUTH_STORAGE_KEY,
    CURRENT_USER_KEY
  ];
  
  keys.forEach(key => localStorage.removeItem(key));
};

// Get user statistics
export const getUserStatistics = () => {
  const allUsers = getAllUsers();
  const currentSession = getCurrentSession();
  
  return {
    totalRegisteredUsers: allUsers.length,
    currentlyLoggedIn: getAuthStatus(),
    currentUserEmail: getCurrentUserEmail(),
    currentUser: currentSession,
    userList: allUsers.map(user => ({
      email: user.email,
      name: user.name,
      createdAt: user.createdAt || 'Unknown'
    }))
  };
};
