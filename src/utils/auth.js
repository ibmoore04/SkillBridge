const USER_STORAGE_KEY = "users";
const AUTH_STORAGE_KEY = "isLoggedIn";
const CURRENT_USER_KEY = "currentUserEmail";

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

export const isLoggedIn = () => {
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
};

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
    (item) => item.email === email && item.password === password,
  );

  if (!user) return null;

  localStorage.setItem(AUTH_STORAGE_KEY, "true");
  localStorage.setItem(CURRENT_USER_KEY, user.email);
  return user;
};

export const logout = () => {
  localStorage.setItem(AUTH_STORAGE_KEY, "false");
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = () => {
  const currentUserEmail = localStorage.getItem(CURRENT_USER_KEY);
  if (!currentUserEmail) return null;

  return (
    getStoredUsers().find((item) => item.email === currentUserEmail) || null
  );
};
