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
  const users = getStoredUsers();

  if (users.some((item) => item.email === user.email)) {
    return false;
  }

  users.push(user);
  saveUsers(users);
  
  return true;
};

export const authenticate = (email, password) => {
  const users = getStoredUsers();

  const user = users.find(
    (item) => item.email === email && item.password === password
  );

  if (!user) return null;

  const session = {
    email: user.email,
    name: user.name || "User",
    loginTime: new Date().toISOString()
  };

  localStorage.setItem(AUTH_STORAGE_KEY, "true");
  localStorage.setItem(CURRENT_USER_KEY, user.email);
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return user;
};

export const logout = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(SESSION_KEY);
};