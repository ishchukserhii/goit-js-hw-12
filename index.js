import{a as g,S as m,i as l}from"./assets/vendor-D0cagnvz.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();const h="https://pixabay.com",y="/api/";function d(e,r,n){const i=new URLSearchParams({key:"48878301-11eef390b295f332c6628756b",q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:n,page:r}),t=h+y+`?${i}`;return g.get(t)}document.querySelector(".gallery");function b(e){return`<li>
 
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

</li>`}function p(e){return e.map(b).join("")}const L=new m(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}),o={btn:document.querySelector(".btn-search"),form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".msg"),btnLoadMore:document.querySelector(".btn-load")},a={searchText:null,page:null,total:null,perPage:40};o.form.addEventListener("submit",async e=>{if(e.preventDefault(),f(),a.page=1,a.searchText=e.target.elements.bookSearch.value.trim(),o.gallery.innerHTML="",a.searchText===""){l.show({backgroundColor:"rgba(255, 67, 67, 0.68)",messageColor:"rgba(255, 255, 255, 1)",close:"true",position:"topRight",title:"🚫",titleColor:"#fff",titleSize:"16px",message:"Поле пошуку порожнє"});return}else{o.loader.innerHTML='<span class="loader"></span>';try{const r=await d(a.searchText,a.page,a.perPage);if(r.data.hits.length===0)l.show({backgroundColor:"rgba(255, 67, 67, 0.68)",messageColor:"rgba(255, 255, 255, 1)",close:"true",position:"topRight",title:"🚫",titleColor:"#fff",titleSize:"16px",message:"Sorry, there are no images matching your search query. Please try again!"}),o.loader.innerHTML="";else{const n=p(r.data.hits);o.gallery.innerHTML=n,L.refresh(),o.loader.innerHTML="",o.form.reset(),a.total=r.data.total,u()}}catch(r){o.loader.innerHTML="",l.show({backgroundColor:"rgba(255, 67, 67, 0.68)",close:"true",position:"topRight",title:"🚫",titleColor:"#fff",titleSize:"16px",messageColor:"rgba(255, 255, 255, 1)",message:"Охохо.....щось пішло не так...."}),console.log(r)}}});o.btnLoadMore.addEventListener("click",async()=>{S(),a.page+=1,u();const e=await d(a.searchText,a.page,a.perPage),r=p(e.data.hits);o.gallery.insertAdjacentHTML("beforeend",r)});function u(){const e=a.perPage,r=Math.ceil(a.total/e);a.page>=r?(f(),l.info("This is last page")):v()}function v(){o.btnLoadMore.hidden=!1}function f(){o.btnLoadMore.hidden=!0}function S(){o.loader.classList.remove("hidden")}
//# sourceMappingURL=index.js.map
