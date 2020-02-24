import fetch from 'isomorphic-fetch';

export function fetchPopularRepos(language="all") {
    const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(encodedURI)
    .then(data => data.json())
    .then(repos => repos.items)
    .catch(error => {
        console.warn(error);
        return null;
    })
}

export function fetchData(url) {
    return fetch(url)
    .then(data => {
        console.log("DATA : " + JSON.stringify(data));
        return data;
    })
    .catch(error => {
        console.warn(error);
        return null;
    })
}