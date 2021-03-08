
const storage = window.localStorage;

export const setToken = (token: string): void => {
      storage["bit-cookie"] = token;
}

export const getToken = (): string|null => storage.getItem("bit-cookie");
