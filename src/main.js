import requestForImgs from "./js/pixabay-api.js"
import iziToast from "izitoast";

const form = document.querySelector(".form")
const moreBtn = document.querySelector(".more-btn")



form.addEventListener("submit", doSearch)

function doSearch(event) {
    event.preventDefault()
    if (event.target.elements.search.value === "") {
         iziToast.show({message: "You have to text something", backgroundColor: "red", messageColor: "white", position: "topCenter"})
    } else {
            document.querySelector(".gallery").innerHTML = ""
            requestForImgs(event)
    }
    form.reset()
}

moreBtn.addEventListener("click", showMoreImgs)

function showMoreImgs(event) {
    requestForImgs(event)
//     const item = document.querySelector(".gallery-item")
//     const itemHight = item.getBoundingClientRect().height
//     window.scrollBy({
//   top: (itemHight * 2),
//   left: 0,
//   behavior: "smooth",
// });
    console.log(itemHight * 2)
}