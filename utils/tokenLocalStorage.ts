const TOKEN_LOCAL_STORAGE_KEY = "access_token";

const tokenLocalStorage = {
  setToken: (value: string) => {
    localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, value);
  },
  getToken: () => {
    const accessToken = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
    return accessToken;
  },
  removeToken: () => {
    localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
  },
};

export default tokenLocalStorage;
