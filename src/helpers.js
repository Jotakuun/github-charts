export const apiHost = 'https:/api.github.com/';

export function fetchData(url, params) {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then((res) => res.json())
        .then(function(res) {
            resolve(res);
        })
        .catch(function(err) {
            reject(err);
        });
    })
}