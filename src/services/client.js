import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";

// TODO
export const getJWT = () => {
  // let token = new Cookies().get('access_token') || null
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjF9.-XWGATiWn40-XFP-yRccxl5B6rLGW-fv2auhlP5PXrE"; // remove
  new Cookies().set('access_token', token) // remove
  return {
    token: token,
    data: jwt.decode(token),
  };
};
