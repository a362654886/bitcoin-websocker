import { user } from "../types/auth-type";
import Axios from "axios";

//const basicURL = `http://localhost:3000/dev/`;
const basicURL = `https://wu4z72qhxc.execute-api.us-east-1.amazonaws.com/dev/`;

export const userAuth = async (
  email: string,
  password: string
): Promise<{
  User: user;
  Token: string;
} | null> => {
  const endpoint = basicURL + "userAuth";
  return Axios.post(endpoint, {
    userEmail: email,
    userPassword: password,
  })
    .then((response) => {
      /*if (response.data.User != null) {
        setToken(response.data.Token);
      }*/
      return response.data;
    })
    .catch(() => {
      return null;
    });
};
