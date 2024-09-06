import jwt from "jsonwebtoken";
import { environments } from "../environments/dev.environemnt";
import { userInfo } from "../models/userData";
import { jwtDecode } from "jwt-decode";

const generateToken = (userinfo: userInfo[]) => {
  const { Id, Name, Access } = userinfo[0];
  const role = Access === 1 ? "admin" : "user";
  const token = jwt.sign(
    { sub: Id, username: Name, role: role },
    environments.Secret_Key,
    { expiresIn: "1h" }
  );
  const decodedToken = jwtDecode(token);
  return {
    token: token,
    decodedToken: decodedToken.exp,
    role: role,
  };
};

export default generateToken;
