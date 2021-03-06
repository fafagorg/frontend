import axios from "axios";
import Cookies from "universal-cookie";

// request('GET', `${endpoint}/user/${id}`, {}, {}, true);
export const request = async (method, uri, data, headers, auth = true, token) => {
  if (["GET", "DELETE"].includes(method)) {
    uri = serializeUrl(uri, data);
  }

  if (auth) {
    const access_token = token;
    headers.Authorization = "Bearer " + access_token;
  }

  try {
    let request = await axios.request({
      method: method,
      url: uri,
      data: data,
      headers: headers,
    });
    return request
  } catch (error) {
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