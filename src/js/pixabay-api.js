import axios from 'axios';


const baseUrl = "https://pixabay.com";
const endPoint = "/api/";



export function getImg (searchName) {
    const params = new URLSearchParams({
        key: '48878301-11eef390b295f332c6628756b',
        q: searchName,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
    });
    const url = baseUrl + endPoint + `?${params}`;
    return axios.get(url)

}