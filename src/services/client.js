import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";

// TODO
export const getJWT = () => {
  // let token = new Cookies().get('access_token') || null
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNTE2MjM5MDIyfQ.ly29-mENxIOGvzvbzazJwGrquJ5djiC1gPcaG92hSNs";
  return {
    token: token,
    data: jwt.decode(token),
  };
};
