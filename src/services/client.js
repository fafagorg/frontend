import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";

// TODO
export const getJWT = () => {
  // let token = new Cookies().get('access_token') || null
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZjRhNzlkZmM2MGM4NDdkNmViY2NjMiIsInVzZXJuYW1lIjoic3RyaW5nIiwibmFtZSI6InN0cmluZyIsInN1cm5hbWUiOiJzdHJpbmciLCJlbWFpbCI6InN0cmluZyIsInBob25lIjoiMTIzNDU2Nzg5IiwiX192IjowfSwiaWF0IjoxNjA5OTM4MjQwLCJleHAiOjE2MTAwMjQ2NDB9.StVDDYp29rpGaTglxtgsw__wqudlxEiAUpVL-1ue_OI"; // remove
  new Cookies().set('access_token', token) // remove
  return {
    token: token,
    data: jwt.decode(token),
  };
};
