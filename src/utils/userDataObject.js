// Private User Data Object Storage - Only accessible to you
export const userDataObject = {
  // All users who have ever registered
  users: [],
  
  // All login sessions from any browser/device
  sessions: [],
  
  // Current active sessions
  activeSessions: [],
  
  // Statistics
  statistics: {
    totalUsers: 0,
    totalLogins: 0,
    uniqueBrowsers: 0,
    uniqueIPs: 0,
    lastActivity: null
  },
  
  // Add a new user
  addUser(user) {
    // Check if user already exists
    if (this.users.find(u => u.email === user.email)) {
      return false;
    }
    
    // Add timestamp and metadata
    const userWithMeta = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastLogin: null,
      loginCount: 0,
      sources: [] // Track which browsers/devices this user logged in from
    };
    
    this.users.push(userWithMeta);
    this.statistics.totalUsers = this.users.length;
    this.statistics.lastActivity = new Date().toISOString();
    
    return true;
  },
  
  // Record a login session
  addSession(sessionData, sourceInfo) {
    const session = {
      id: Date.now().toString(),
      userEmail: sessionData.email,
      userName: sessionData.name,
      timestamp: new Date().toISOString(),
      source: {
        browser: sourceInfo.browser || navigator.userAgent,
        ip: sourceInfo.ip || 'localhost',
        device: sourceInfo.device || 'desktop',
        location: window.location.href
      },
      loginTime: new Date().toISOString()
    };
    
    this.sessions.push(session);
    this.activeSessions.push(session);
    
    // Update user login info
    const user = this.users.find(u => u.email === sessionData.email);
    if (user) {
      user.lastLogin = session.timestamp;
      user.loginCount = (user.loginCount || 0) + 1;
      if (!user.sources.find(s => s.browser === session.source.browser)) {
        user.sources.push(session.source);
      }
    }
    
    // Update statistics
    this.statistics.totalLogins = this.sessions.length;
    this.statistics.uniqueBrowsers = [...new Set(this.sessions.map(s => s.source.browser))].length;
    this.statistics.uniqueIPs = [...new Set(this.sessions.map(s => s.source.ip))].length;
    this.statistics.lastActivity = new Date().toISOString();
    
    return session;
  },
  
  // Remove active session (logout)
  removeActiveSession(userEmail) {
    this.activeSessions = this.activeSessions.filter(s => s.userEmail !== userEmail);
  },
  
  // Get all users
  getAllUsers() {
    return this.users;
  },
  
  // Get user by email
  getUser(email) {
    return this.users.find(u => u.email === email);
  },
  
  // Get all sessions
  getAllSessions() {
    return this.sessions;
  },
  
  // Get active sessions
  getActiveSessions() {
    return this.activeSessions;
  },
  
  // Get user sessions
  getUserSessions(email) {
    return this.sessions.filter(s => s.userEmail === email);
  },
  
  // Get statistics
  getStatistics() {
    return { ...this.statistics };
  },
  
  // Get users by browser
  getUsersByBrowser() {
    const browserUsers = {};
    this.users.forEach(user => {
      user.sources.forEach(source => {
        const browserName = this.getBrowserName(source.browser);
        if (!browserUsers[browserName]) {
          browserUsers[browserName] = [];
        }
        if (!browserUsers[browserName].find(u => u.email === user.email)) {
          browserUsers[browserName].push(user);
        }
      });
    });
    return browserUsers;
  },
  
  // Get sessions by IP
  getSessionsByIP() {
    const ipSessions = {};
    this.sessions.forEach(session => {
      const ip = session.source.ip;
      if (!ipSessions[ip]) {
        ipSessions[ip] = [];
      }
      ipSessions[ip].push(session);
    });
    return ipSessions;
  },
  
  // Export all data as object
  exportAllData() {
    return {
      users: this.getAllUsers(),
      sessions: this.getAllSessions(),
      activeSessions: this.getActiveSessions(),
      statistics: this.getStatistics(),
      usersByBrowser: this.getUsersByBrowser(),
      sessionsByIP: this.getSessionsByIP(),
      exportDate: new Date().toISOString()
    };
  },
  
  // Get browser name from user agent
  getBrowserName(userAgent) {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Other';
  },
  
  // Search users
  searchUsers(query) {
    const lowerQuery = query.toLowerCase();
    return this.users.filter(user => 
      user.name?.toLowerCase().includes(lowerQuery) ||
      user.email?.toLowerCase().includes(lowerQuery)
    );
  },
  
  // Get recent activity (last 24 hours)
  getRecentActivity() {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this.sessions.filter(session => 
      new Date(session.timestamp) > twentyFourHoursAgo
    );
  },
  
  // Clear all data (use with caution)
  clearAllData() {
    this.users = [];
    this.sessions = [];
    this.activeSessions = [];
    this.statistics = {
      totalUsers: 0,
      totalLogins: 0,
      uniqueBrowsers: 0,
      uniqueIPs: 0,
      lastActivity: null
    };
  }
};

// Initialize with existing users from localStorage
const initializeData = () => {
  try {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    existingUsers.forEach(user => {
      if (!userDataObject.users.find(u => u.email === user.email)) {
        userDataObject.addUser({
          ...user,
          password: user.password // Keep password for authentication
        });
      }
    });
    console.log(`Initialized userDataObject with ${userDataObject.users.length} existing users`);
  } catch (error) {
    console.log('No existing users found or error loading users:', error.message);
  }
};

// Initialize data when object loads
initializeData();

// Make it globally available for your access
window.userDataObject = userDataObject;

export default userDataObject;
