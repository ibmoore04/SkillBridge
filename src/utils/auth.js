const USER_STORAGE_KEY = "users";
const AUTH_STORAGE_KEY = "isLoggedIn";
const CURRENT_USER_KEY = "currentUserEmail";
const SESSION_KEY = "sessionUser";

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const getStoredUsers = () => {
  return safeParse(localStorage.getItem(USER_STORAGE_KEY)) || [];
};

const saveUsers = (users) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
};

/* =========================
   SESSION HELPERS
========================= */

export const getSession = () => {
  return safeParse(localStorage.getItem(SESSION_KEY));
};

export const isLoggedIn = () => {
  const authFlag = localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  const session = getSession();
  return authFlag && session !== null;
};

export const getCurrentUser = () => {
  const session = getSession();
  return session || null;
};

/* =========================
   AUTH FUNCTIONS
========================= */

export const registerUser = (user) => {
  console.log('auth.registerUser called with:', user);
  
  // Store in localStorage for app functionality
  const users = getStoredUsers();

  if (users.some((item) => item.email === user.email)) {
    console.log('User already exists in localStorage:', user.email);
    return false;
  }

  // Add timestamp to user data
  const userWithTimestamp = {
    ...user,
    createdAt: new Date().toISOString(),
    lastLogin: null
  };

  users.push(userWithTimestamp);
  saveUsers(users);
  
  console.log('User saved to localStorage:', userWithTimestamp);
  
  // Store in private object (your personal data collection)
  if (typeof window !== 'undefined' && window.userDataObject) {
    console.log('userDataObject available, calling addUser...');
    window.userDataObject.addUser(userWithTimestamp);
  } else {
    console.log('userDataObject NOT available:', typeof window, window.userDataObject);
  }
  
  return true;
};

export const authenticate = (email, password) => {
  console.log('auth.authenticate called with:', email, '***');
  
  const users = getStoredUsers();

  const user = users.find(
    (item) => item.email === email && item.password === password
  );

  if (!user) {
    console.log('Authentication failed - user not found');
    return null;
  }

  console.log('User found for authentication:', user.email);

  // Update last login time
  user.lastLogin = new Date().toISOString();
  saveUsers(users);

  const session = {
    email: user.email,
    name: user.name || "User",
    loginTime: new Date().toISOString()
  };

  localStorage.setItem(AUTH_STORAGE_KEY, "true");
  localStorage.setItem(CURRENT_USER_KEY, user.email);
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  console.log('Session created:', session);

  // First, ensure user exists in userDataObject
  if (typeof window !== 'undefined' && window.userDataObject) {
    console.log('userDataObject available, ensuring user exists...');
    
    // Check if user exists in userDataObject, if not add them
    const existingUser = window.userDataObject.getUser(email);
    if (!existingUser) {
      console.log('User not in userDataObject, adding them...');
      window.userDataObject.addUser(user);
    }
    
    // Store session in private object (your personal data collection)
    console.log('Adding session to userDataObject...');
    window.userDataObject.addSession(session, {
      browser: navigator.userAgent,
      ip: 'localhost', // Would be filled by server in production
      device: 'desktop',
      location: window.location.href
    });
  } else {
    console.log('userDataObject NOT available during login');
  }

  return user;
};

export const logout = () => {
  const currentUser = getCurrentUser();
  
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(SESSION_KEY);
  
  // Remove active session from private object
  if (typeof window !== 'undefined' && window.userDataObject && currentUser) {
    window.userDataObject.removeActiveSession(currentUser.email);
  }
};