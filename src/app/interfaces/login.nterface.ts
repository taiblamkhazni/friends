export interface LoginInterface {
  token?: string;
  user: {
    id?: number;
    lastName?: string;
    firstName?: string;
    email: string;
    password: string;
    isAdmin?: boolean;
  };
}
