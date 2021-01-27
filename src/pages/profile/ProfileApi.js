

class ProfileApi {
    static API_BASE_URL = process.env.REACT_APP_ENDPOINT_API_AUTH + '/api/v1';

    static requestHeaders(token) {
        return token ? {
            Authorization: token
        } : {}
    }

    static getProfile(id) {
        const request = new Request(ProfileApi.API_BASE_URL + "/profile/" + id, {
            method: 'GET',
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }
}


export default ProfileApi;

