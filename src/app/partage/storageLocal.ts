export const addUserIdStorage = (id: number) => {
  localStorage.setItem("id", JSON.stringify(id));
};
export const getUserIdStorage = (): number => {
  let userid = Number.parseInt(localStorage.getItem("id"));
  return userid;
};

export const addisAdmin = (user: boolean) => {
  localStorage.setItem("admin", JSON.stringify(user));
};
export const getisAdmin = (): boolean => {
  let admin = localStorage.getItem("admin");
  if (admin == "true") {
    return true;
  }
  return false;
};
export function getToken(): string {
  return localStorage.getItem("token");
}
export const addToken = (token: string) => {
  localStorage.setItem("token", token);
};
export const isValid = (): boolean => {
  const token = getToken();

  if (token) {
    return true;
  }
  return false;
};
export const loggedIn = () => {
  return isValid();
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
export const removeId = () => {
  localStorage.removeItem("id");
};
export const removeAdmin = () => {
  localStorage.removeItem("admin");
};

export const isValidId = (userId: number): boolean => {
  const id = getUserIdStorage();

  if (userId == id) {
    return true;
  }
  return false;
};
