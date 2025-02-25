import{a as h,S as m,i as l}from"./assets/vendor-D0cagnvz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const y="https://pixabay.com",b="/api/";function d(e,t,n){const i=new URLSearchParams({key:"48878301-11eef390b295f332c6628756b",q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:n,page:t}),r=y+b+`?${i}`;return h.get(r)}document.querySelector(".gallery");function L(e){return`<li>
 
  <div class="card">
   <a class="gallery-link" href="${e.largeImageURL}">
  <img class="card-img" src="${e.webformatURL}" alt="${e.tags}"/>
  </a>
  <div class="card-info">
  <div class="info-container">
    <div class="info-labels">
      <span>Likes</span>
      <span>Views</span>
      <span>Comments</span>
      <span>Downloads</span>
    </div>
    <div class="info-values">
      <span>${e.likes}</span>
      <span>${e.views}</span>
      <span>${e.comments}</span>
      <span>${e.downloads}</span>
    </div>
  </div>
</div>

</li>`}function u(e){return e.map(L).join("")}const p=new m(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}),o={btn:document.querySelector(".btn-search"),form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".msg"),btnLoadMore:document.querySelector(".btn-load"),loaderSec:document.querySelector(".loader")},a={searchText:null,page:null,total:null,perPage:40};o.form.addEventListener("submit",async e=>{if(e.preventDefault(),g(),a.page=1,a.searchText=e.target.elements.bookSearch.value.trim(),o.gallery.innerHTML="",a.searchText===""){l.show({backgroundColor:"rgba(255, 67, 67, 0.68)",messageColor:"rgba(255, 255, 255, 1)",close:"true",position:"topRight",title:"🚫",titleColor:"#fff",titleSize:"16px",message:"Поле пошуку порожнє"});return}else{o.loader.innerHTML='<span class="loader"></span>';try{const t=await d(a.searchText,a.page,a.perPage);if(t.data.hits.length===0)l.show({backgroundColor:"rgba(255, 67, 67, 0.68)",messageColor:"rgba(255, 255, 255, 1)",close:"true",position:"topRight",title:"🚫",titleColor:"#fff",titleSize:"16px",message:"Sorry, there are no images matching your search query. Please try again!"}),o.loader.innerHTML="";else{const n=u(t.data.hits);o.gallery.innerHTML=n,p.refresh(),o.loader.innerHTML="",o.form.reset(),a.total=t.data.total,f()}}catch(t){o.loader.innerHTML="",l.show({backgroundColor:"rgba(255, 67, 67, 0.68)",close:"true",position:"topRight",title:"🚫",titleColor:"#fff",titleSize:"16px",messageColor:"rgba(255, 255, 255, 1)",message:"Охохо.....щось пішло не так...."}),console.log(t)}}});o.btnLoadMore.addEventListener("click",async()=>{v(),a.page+=1,f();const e=await d(a.searchText,a.page,a.perPage),t=u(e.data.hits);w(),o.gallery.insertAdjacentHTML("beforeend",t),p.refresh(),M()});function f(){const e=a.perPage,t=Math.ceil(a.total/e);a.page>=t?(g(),l.show({message:"We're sorry, but you've reached the end of search results."})):S()}function S(){o.btnLoadMore.hidden=!1}function g(){o.btnLoadMore.hidden=!0}function v(){o.loaderSec.classList.remove("hidden")}function w(){o.loaderSec.classList.add("hidden")}function M(){const t=o.gallery.firstElementChild.getBoundingClientRect().height;window.scrollBy({behavior:"smooth",top:t*2})}
//# sourceMappingURL=index.js.map
