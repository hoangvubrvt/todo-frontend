var Fetch = require('whatwg-fetch');
var baseURL = 'http://localhost:8081/api';

var service = {
    get: function (url) {
        return fetch(baseURL + url).then(function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            console.log('Get request URL: ' + response.url);
            return response.json();
        });
    },

    post: function (url, data) {
        return fetch(baseURL + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function (response) {
            console.log('POST request URL: ' + response.url);
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }

            return response.json();
        })
    }
}

module.exports = service;