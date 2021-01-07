import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";

// TODO
export const getJWT = () => {
  // let token = new Cookies().get('access_token') || null
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZjRhNzlkZmM2MGM4NDdkNmViY2NjMiIsInVzZXJuYW1lIjoic3RyaW5nIiwibmFtZSI6InN0cmluZyIsInN1cm5hbWUiOiJzdHJpbmciLCJlbWFpbCI6InN0cmluZyIsInBob25lIjoiMTIzNDU2Nzg5IiwiX192IjowfSwiaWF0IjoxNjEwMDQxOTc0LCJleHAiOjE2MTAxMjgzNzR9.Wj5bgY_xY1e92rpYt4arIHAVoyLjV_WrxZ-l9EoBPFY"; // remove
  new Cookies().set('access_token', token) // remove
  return {
    token: token,
    data: jwt.decode(token),
  };
};
