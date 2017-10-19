import * as d3 from 'd3';

export const apiHost = 'https:/api.github.com/';

export function fetchData(url, params) {
    return new Promise((resolve) => {
        fetch(url)
        .then((res) => res.json())
        .then(function(res) {
            console.log('res', res)
            resolve(res)
        })
        .catch(function(err) {
            console.log('err', err)
        });
    })
}