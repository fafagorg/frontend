import * as requestService from "./request";

export const getProducts = async () => {
  let request = await requestService.request('GET', process.env.REACT_APP_ENDPOINT_API_PRODUCT+`/api/v1/products`, {}, {}, false);
  return request.data
};

export const getProductById = async (id) => {
  let request = await requestService.request('GET', process.env.REACT_APP_ENDPOINT_API_PRODUCT+`/api/v1/products/`+id, {}, {}, false);
  return request.data
};

export const getProductsFiltered = async (name,priceMin,priceMax,category) => {
  let request = await requestService.request('GET', process.env.REACT_APP_ENDPOINT_API_PRODUCT+`/api/v1/products/?min_price=${priceMin}&max_price=${priceMax}&keyWord=${name}&productCategory=${category}`, {}, {}, false);
  return request.data
};

export const addProduct = async (data, token) => {
  let request = await requestService.request('POST', process.env.REACT_APP_ENDPOINT_API_PRODUCT+`/api/v1/products`, data, {}, true, token);
  return request.data
};

export const editProduct = async (productId,data, token) => {
  let request = await requestService.request('PUT', process.env.REACT_APP_ENDPOINT_API_PRODUCT+`/api/v1/products/${productId}`, data, {}, true, token);
  return request.data
};

export const deleteProduct = async (productId, token) => {
  let request = await requestService.request('DELETE', process.env.REACT_APP_ENDPOINT_API_PRODUCT+`/api/v1/products/${productId}`, {}, true, token);
  return request.data
};

export const getExchangeRates = async () => {
  let request = await requestService.request('GET', process.env.REACT_APP_ENDPOINT_API_PRODUCT+`/api/v1/rates`, {}, {}, false);
  return request.data
};

export const getClientProducts = async (username) => {
  let request = await requestService.request('GET', process.env.REACT_APP_ENDPOINT_API_PRODUCT+`/api/v1/products/client/`+username, {}, {}, false);
  return request.data
};
