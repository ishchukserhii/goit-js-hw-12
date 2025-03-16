import { getImg } from './js/pixabay-api.js';
import { createElemets } from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const refs = {
  btn: document.querySelector('.btn-search'),
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.msg'),
  btnLoadMore: document.querySelector('.btn-load'),
  loaderSec: document.querySelector('.loader'),
};

const params = {
  searchText: null,
  page: null,
  total: null,
  perPage: 40,
};

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  hideLoadMoreBtn();
  params.page = 1;
  params.searchText = e.target.elements.bookSearch.value.trim();
  refs.gallery.innerHTML = '';
  if (params.searchText === '') {
    iziToast.show({
      backgroundColor: 'rgba(255, 67, 67, 0.68)',
      messageColor: `rgba(255, 255, 255, 1)`,
      close: `true`,
      position: 'topRight',
      title: '🚫',
      titleColor: '#fff',
      titleSize: '16px',
      message: 'Поле пошуку порожнє',
    });
    return;
  } else {
    refs.loader.innerHTML = '<span class="loader"></span>';
    try {
      const res = await getImg(params.searchText, params.page, params.perPage);
      if (res.data.hits.length === 0) {
        iziToast.show({
          backgroundColor: 'rgba(255, 67, 67, 0.68)',
          messageColor: `rgba(255, 255, 255, 1)`,
          close: `true`,
          position: 'topRight',
          title: '🚫',
          titleColor: '#fff',
          titleSize: '16px',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        refs.loader.innerHTML = '';
      } else {
        const pushGallery = createElemets(res.data.hits);
        refs.gallery.innerHTML = pushGallery;
        lightbox.refresh();
        refs.loader.innerHTML = '';
        refs.form.reset();
        params.total = res.data.total;
        checkBtnStatus();
      }
    } catch (error) {
      refs.loader.innerHTML = '';
      iziToast.show({
        backgroundColor: 'rgba(255, 67, 67, 0.68)',
        close: `true`,
        position: 'topRight',
        title: '🚫',
        titleColor: '#fff',
        titleSize: '16px',
        messageColor: `rgba(255, 255, 255, 1)`,
        message: 'Охохо.....щось пішло не так....',
      });
      console.log(error);
    }
  }
});

refs.btnLoadMore.addEventListener('click', async () => {
  showSpinner();
  params.page += 1;
  checkBtnStatus();
  const res = await getImg(params.searchText, params.page, params.perPage);
  const markup = createElemets(res.data.hits);
  hideSpinner();
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
  scrollPage();
});

function checkBtnStatus() {
  const perPage = params.perPage;
  const maxPage = Math.ceil(params.total / perPage);

  if (params.page >= maxPage) {
    hideLoadMoreBtn();
    iziToast.show({
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    showLoadMoreBtn();
  }
}
function showLoadMoreBtn() {
  refs.btnLoadMore.hidden = false;
}

function hideLoadMoreBtn() {
  refs.btnLoadMore.hidden = true;
}

function showSpinner() {
  refs.loaderSec.classList.remove('hidden');
}

function hideSpinner() {
  refs.loaderSec.classList.add('hidden');
}

function scrollPage() {
  const info = refs.gallery.firstElementChild.getBoundingClientRect();
  const height = info.height;
  window.scrollBy({
    behavior: 'smooth',
    top: height * 2,
  });
}


// 