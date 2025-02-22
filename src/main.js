import {getImg} from './js/pixabay-api.js';
import {createElemets} from './js/render-functions.js'

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
});

const refs = {
    btn : document.querySelector('.btn-search'),
    form : document.querySelector('.search-form'),
    gallery : document.querySelector('.gallery'),
    loader: document.querySelector('.msg'),
}



refs.form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let searchText = e.target.elements.bookSearch.value.trim();
    refs.gallery.innerHTML = '';
    if(searchText === ''){
        iziToast.show ({
            backgroundColor: 'rgba(255, 67, 67, 0.68)',
            messageColor: `rgba(255, 255, 255, 1)`,
            close: `true`,
            position: "topRight",
            title: '🚫',
            titleColor: '#fff',
            titleSize: '16px',
            message: 'Поле пошуку порожнє'
        });
        return}
        else{
            refs.loader.innerHTML = '<span class="loader"></span>';
            getImg (searchText)

            .then(res => {
                if (res.data.hits.length === 0){
                    iziToast.show(
                        { backgroundColor: 'rgba(255, 67, 67, 0.68)',
                            messageColor: `rgba(255, 255, 255, 1)`,
                            close: `true`,
                            position: "topRight",
                            title: '🚫',
                            titleColor: '#fff',
                            titleSize: '16px',
                            message: 'Sorry, there are no images matching your search query. Please try again!'
                        }
                    )
                    refs.loader.innerHTML = ''
                }
                else{
                    const pushGallery = createElemets(res.data.hits);
                    refs.gallery.innerHTML = pushGallery;
                    lightbox.refresh();
                    refs.loader.innerHTML = ''
                    refs.form.reset()
                }
            })
            .catch(error => {
                refs.loader.innerHTML = '';
                iziToast.show(
                    { backgroundColor: 'rgba(255, 67, 67, 0.68)',
                        messageColor: `rgba(255, 255, 255, 1)`,
                        close: `true`,
                        position: "topRight",
                        title: '🚫',
                        titleColor: '#fff',
                        titleSize: '16px',
                        message: 'Охохо.....щось пішло не так....'
                    })
                console.log(error);
            })
        }
    })








