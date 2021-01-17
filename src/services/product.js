import * as requestService from "./request";

export const getProducts = async () => {
    let request = await requestService.request('GET', `http://51.103.75.211:8080/api/v1/products`, {}, {}, false);
    return request.data
  };
