export const apiHost = 'https:/api.github.com/';

export const colors = ["#9780ED", "#80EDCE"];

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