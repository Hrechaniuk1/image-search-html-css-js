const gallery = document.querySelector(".gallery")

function doMarkUp(data) {
        const markUp = data.hits.map(a =>
        `<li class="gallery-item" data-id="${a.id}">
        <div class="img-container" >
        <a class="large-image" href="${a.largeImageURL}">
        <img class="image" src="${a.webformatURL}" alt="${a.tags}">
        </a> 
        </div>
        <ul class="description-list" >
          <li class="description-item"><p>Likes</p><p>${a.likes}</p></li>
          <li class="description-item"><p>Views</p><p>${a.views}</p></li>
          <li class="description-item"><p>Comments</p><p>${a.comments}</p></li>
          <li class="description-item"><p>Downloads</p><p>${a.downloads}</p></li>
        </ul>
      </li>`).join("")
    gallery.insertAdjacentHTML("beforeend", markUp)
}
                
export default doMarkUp          