

class ReviewsApi {
    static API_BASE_URL = process.env.REACT_APP_ENDPOINT_API_REVIEWS + '/api/v1';

    static requestHeaders(token) {
        return token ? {
            Authorization: token
        } : {}
    }

    static getAllReviews() {
        const headers = this.requestHeaders();
        const request = new Request(ReviewsApi.API_BASE_URL + "/reviews", {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }

    
    static getReview(id) {
        const request = new Request(ReviewsApi.API_BASE_URL + "/reviews/" + id, {
            method: 'GET'
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }

    static getReviewsByTypeAndId(type, id) {
        const headers = this.requestHeaders();
        const request = new Request(ReviewsApi.API_BASE_URL + "/reviews/" + type + "/" + id, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }


    static postReview(token, review) {
        const headers = this.requestHeaders(token);

        const request = new Request(ReviewsApi.API_BASE_URL + "/reviews", {
            method: 'POST',
            headers: { ...headers, "Content-Type": "application/json" },
            body: JSON.stringify(review)
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }

    static postComment(token, comment, reviewId) {
        const headers = this.requestHeaders(token);
       
        const request = new Request(ReviewsApi.API_BASE_URL + "/review/" + reviewId + '/comments', {
            method: 'POST',
            headers: { ...headers, "Content-Type": "application/json" },
            body: JSON.stringify(comment)
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }

    static async checkBadWords(review) {
        const requestBad = new Request("/static/jsons/badwords.json", {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        let response = await fetch(requestBad);
        let responseJson = await response.json();
        let result = false;
        responseJson.badwordList.forEach(badWord => {
            if (review.title.toLowerCase().includes(badWord) || review.description.toLowerCase().includes(badWord)) {
                result = true;
            }
        })
        return result;

    }


    static deleteReview(token, id) {
        const headers = this.requestHeaders(token);
        const request = new Request(ReviewsApi.API_BASE_URL + "/reviews/" + id, {
            method: 'DELETE',
            headers: headers
        });

        return fetch(request).then(response => {
            return response;
        });
    }

    static putReview(token, id, review) {
        const headers = this.requestHeaders(token);
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

