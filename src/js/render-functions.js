
const refs = {
  gallery: document.querySelector('.gallery'),
};

function createElemet(img) {
  return `<li>
 
  <div class="card">
   <a class="gallery-link" href="${img.largeImageURL}">
  <img class="card-img" src="${img.webformatURL}" alt="${img.tags}"/>
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
      <span>${img.likes}</span>
      <span>${img.views}</span>
      <span>${img.comments}</span>
      <span>${img.downloads}</span>
    </div>
  </div>
</div>

</li>`
}

export function createElemets(images) {
  return images.map(createElemet).join('');
}




