class ReviewsApi {
    static API_BASE_URL = "http://localhost:8080/api/v1";

    static requestHeaders(auth) {
        return auth ? {
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwMDQzN2Q5ODU2MzllNDdkYWQ4MmQ4NyIsInVzZXJuYW1lIjoiVGVzdEp1YW5taSIsIm5hbWUiOiJKdWFubWkiLCJzdXJuYW1lIjoiQmxhbmNvIiwiZW1haWwiOiJqdWFibGFmZXJAYWx1bS51cy5lcyIsInBob25lIjoiNjY2MTExMjIyIiwiX192IjowfSwiaWF0IjoxNjExNDAxMDY2LCJleHAiOjE2MTE0ODc0NjZ9.VJp7mUvFtjqyT0GNMYnHogn4RlquQvRHZaHslaP9FxA"
        } : {}
    }

    static getAllReviews() {
        const headers = this.requestHeaders(false);
        const request = new Request(ReviewsApi.API_BASE_URL + "/reviews", {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }

    static postReview(review) {
        const headers = this.requestHeaders(true);
        const request = new Request(ReviewsApi.API_BASE_URL + "/reviews", {
            method: 'POST',
            headers: { ...headers, "Content-Type": "application/json" },
            body: JSON.stringify(review)
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }

    static deleteReview(id) {
        const headers = this.requestHeaders(true);
        const request = new Request(ReviewsApi.API_BASE_URL + "/reviews/" + id, {
            method: 'DELETE',
            headers: headers
        });

        return fetch(request).then(response => {
            return response;
        });
    }

    static putReview(id, review) {
        const headers = this.requestHeaders(true);
        const request = new Request(ReviewsApi.API_BASE_URL + "/reviews/" + id, {
            method: 'PUT',
            headers: { ...headers, "Content-Type": "application/json" },
            body: JSON.stringify(review)
        });

        return fetch(request).then(response => {
            return response;
        });
    }
}

export default ReviewsApi;