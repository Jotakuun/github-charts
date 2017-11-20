export const apiHost = 'https://api.github.com/';

export const colors = ['#9780ED', '#80EDCE', '#FFDB3D', '#FAA952', '#F584C6', '#737FFF'];

export function fetchData(url, params) {
    return new Promise((resolve, reject) => {
        fetch(url, params)
            .then((res) => res.json())
            .then(function (res) {
                resolve(res);
            })
            .catch(function (err) {
                reject(err);
            });
    })
}

export function debounce(fn, delay) {
    var timer = null;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}