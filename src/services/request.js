import axios from "axios";
import * as ClientService from "./client";
import Cookies from "universal-cookie";

// request('GET', `${endpoint}/user/${id}`, {}, {}, true);
export const request = async (method, uri, data, headers, auth = true) => {
  if (["GET", "DELETE"].includes(method)) {
    uri = serializeUrl(uri, data);
  }

  if (auth) {
    const access_token = ClientService.getJWT().token;
    headers.Authorization = "Bearer " + access_token;
  }

  try {
    return await axios.request({
      method: method,
      url: uri,
      data: data,
      headers: headers,
    });
  } catch (error) {
    const exp = JSON.parse(atob(new Cookies().get('access_token').split('.')[1])).exp * 1000;
    if (new Date().getTime() >= exp) {
      new Cookies().remove('access_token')
      window.location.href = "/";
    }
    throw error;
  }
};

const serializeUrl = (uri, params) => {
  const str = [];

  for (const p in params) {
    if (params.hasOwnProperty(p) && params[p] !== null) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
    }
  }

  if (str.length) {
    return uri + "?" + str.join("&");
  } else {
    return uri;
  }
};
