import * as requestService from "./request";

export const getProducts = async () => {
    let request = await requestService.request('GET', `http://51.103.75.211:8080/api/v1/products`, {}, {}, false);
    return request.data
  };

export const addProduct = async (data) => {
    let request = await requestService.request('POST', `http://51.103.75.211:8080/api/v1/products`, data, {}, false);
    return request.data
  };

export const editProduct = async (productId,data) => {
    let request = await requestService.request('PUT', `http://51.103.75.211:8080/api/v1/products/${productId}`, data, {}, false);
    return request.data
  };

export const deleteProduct = async (productId) => {
    let request = await requestService.request('DELETE', `http://51.103.75.211:8080/api/v1/products/${productId}`, {}, {}, false);
    return request.data
  };