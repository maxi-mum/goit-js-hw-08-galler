import galleryItems from './gallery-items.js';


const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalBtnClose: document.querySelector('button[data-action="close-lightbox"]'),
  modalImage: document.querySelector('.lightbox__image'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
};

const galleryMarkup = createGallery(galleryItems);
refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);

function createGallery(e) {
  return e
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join('');
}

refs.gallery.addEventListener('click', modalOpen);

function modalOpen(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  evt.preventDefault();

  refs.modal.classList.add('is-open');
  refs.modalImage.src = evt.target.dataset.source;
  refs.modalImage.alt = evt.target.alt;
};

refs.modalBtnClose.addEventListener('click', modalClose);

function modalClose() {
  refs.modal.classList.remove('is-open');
  refs.modalImage.src = '';
  refs.modalImage.alt = '';
};