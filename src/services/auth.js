import * as requestService from "./request";

export const getUsers = async () => {
    let request = await requestService.request('GET', `${process.env.REACT_APP_ENDPOINT_API_AUTH}/api/v1/users`, {}, {}, true);
    return request.data
  };

export const login = async (data) => {
    let request = await requestService.request('POST', `${process.env.REACT_APP_ENDPOINT_API_AUTH}/api/v1/auth/login`, data, {}, false);
    return request.data
  };

export const register = async (data) => {
    let request = await requestService.request('POST', `${process.env.REACT_APP_ENDPOINT_API_AUTH}/api/v1/auth/register`, data, {}, false);
    return request.data
  };