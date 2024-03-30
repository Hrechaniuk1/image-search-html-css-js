import doMarkUp from "./render-functions.js"
import SimpleLightbox from "simplelightbox"
import iziToast from "izitoast";
import axios from "axios";

// =============================================================================

const loader = document.querySelector(".loader")
const imgPerOneTime = 15 
let imgAmount
const totalPages = Math.ceil(imgAmount / imgPerOneTime)
let page = 1
let searchWord

// =============================================================================

async function requestForImgs (event) {
    searchWord = event.target.elements.search.value.trim()
    page = 1
    try { 
         loader.classList.remove("is-hidden")
        const response = await axios.get("https://pixabay.com/api/", {
             params: {
                 key: "42614843-af27c28624474ca020601ef6c",
                 q: searchWord,
                 image_type: "photo",
                 orientation: "horizontal",
                 safesearch: "true",
                 per_page: 15,
                 page,
             }
        })
        if (response.data.hits.length === 0) {
             iziToast.show({ message: "Sorry, there are no images matching your search query. Please try again!", backgroundColor: "red", messageColor: "white", position: "topCenter" })
         } else {
             doMarkUp(response.data)
             document.querySelector(".more-btn").classList.remove("is-hidden")
        }
        loader.classList.add("is-hidden")
         const lightbox = new SimpleLightbox(".large-image", { captionDelay: 250, captionsData: "alt", })
         lightbox.refresh()
    } catch {
        iziToast.show({ message: "Sorry, something goes wrong!", backgroundColor: "red", messageColor: "white", position: "topCenter" })
    }
}

export async function showMoreImgs(event) {
    page += 1
    try { 
        loader.classList.remove("is-hidden")
        const response = await axios.get("https://pixabay.com/api/", {
             params: {
                 key: "42614843-af27c28624474ca020601ef6c",
                 q: searchWord,
                 image_type: "photo",
                 orientation: "horizontal",
                 safesearch: "true",
                 per_page: 15,
                 page,
             }
        })
        if (response.data.hits.length === 0) {
             iziToast.show({ message: "Sorry, there are no images matching your search query. Please try again!", backgroundColor: "red", messageColor: "white", position: "topCenter" })
         } else {
            doMarkUp(response.data)
            if (totalPages <= page) {
                     document.querySelector(".more-btn").classList.add("is-hidden")
                     iziToast.show({ message: "We're sorry, but you've reached the end of search results.", backgroundColor: "red", messageColor: "white", position: "topCenter" })
                 }
                scrollByImg()
             
         }
         loader.classList.add("is-hidden")
         const lightbox = new SimpleLightbox(".large-image", { captionDelay: 250, captionsData: "alt", })
         lightbox.refresh()
    } catch {
        
    }
}

function scrollByImg() {
const item = document.querySelector(".gallery-item")
const itemHight = item?.getBoundingClientRect().height
window.scrollBy({
    top: (itemHight * 2),
    left: 0,
        behavior: "smooth",
    });
}

// const requestForImgs = async (event) => {
//     let keyWord
//     if (event.target === document.querySelector(".more-btn")) {
//         keyWord = searchWord
//         page += 1
//     } else {
//         searchWord = event.target.elements.search.value.trim()
//         keyWord = searchWord
//         page = 1
//     }
//     const loader = document.querySelector(".loader")
//     try {
//          loader.classList.remove("is-hidden")
//          const response = await axios.get("https://pixabay.com/api/", {
//              params: {
//                  key: "42614843-af27c28624474ca020601ef6c",
//                  q: keyWord,
//                  image_type: "photo",
//                  orientation: "horizontal",
//                  safesearch: "true",
//                  per_page: 15,
//                  page,
//              }
//          })
//          if (response.data.hits.length === 0) {
//              iziToast.show({ message: "Sorry, there are no images matching your search query. Please try again!", backgroundColor: "red", messageColor: "white", position: "topCenter" })
//          } else {
//              doMarkUp(response.data)
//              document.querySelector(".more-btn").classList.remove("is-hidden")
//              if (event.target === document.querySelector(".more-btn")) {
//                 const imgPerOneTime = 15
//                 let imgAmount = response.data.totalHits
//                  const totalPages = Math.ceil(imgAmount / imgPerOneTime)
//                  if (totalPages <= page) {
//                      document.querySelector(".more-btn").classList.add("is-hidden")
//                      iziToast.show({ message: "We're sorry, but you've reached the end of search results.", backgroundColor: "red", messageColor: "white", position: "topCenter" })
//                  }
//                  const item = document.querySelector(".gallery-item")
//                     const itemHight = item.getBoundingClientRect().height
//                     window.scrollBy({
//                         top: (itemHight * 2),
//                         left: 0,
//                         behavior: "smooth",
//                         });
//              }
//          }
//          loader.classList.add("is-hidden")
//          const lightbox = new SimpleLightbox(".large-image", { captionDelay: 250, captionsData: "alt", })
//          lightbox.refresh()
//      } catch (error) {
//          iziToast.show({ message: "Sorry, something goes wrong!", backgroundColor: "red", messageColor: "white", position: "topCenter" })
//      }
// }

// =============================================================================

export default requestForImgs