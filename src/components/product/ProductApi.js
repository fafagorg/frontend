class ProductsApi {
    static API_BASE_URL = "http://34.203.204.190/api/v1";

    static requestHeaders() {
        return {}
    }

    static getAllProducts() {
        const headers = this.requestHeaders();
        const request = new Request(ProductsApi.API_BASE_URL + "/products", {
            method: 'GET',
            headers: headers,
            mode: 'no-cors'
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }
}

export default ProductsApi;