const accordeonButtons = document.querySelectorAll('#accordeon-button');
const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const openPopupButton = document.querySelector('#request-button');

const ACTIVE_ACCORDEON_CLASS = 'accordeon__button--active';
const NOJS_ACCORDEON_CLASS = 'accordeon__button--nojs';
const NOJS_WRAPPER_CLASS = 'accordeon__wrapper--nojs';
const MODAL_SHOW_CLASS = 'modal-show';

// accordeon
const resetMaxHeight = (element) => {
  if (element) {
    element.style.maxHeight = null;
  }
};

const closeAccordeons = (currentAccordeon, allAccordeons) => {
  for (let i = 0; i < allAccordeons.length; i++) {
    if (
      allAccordeons[i].classList.contains(ACTIVE_ACCORDEON_CLASS)
      &&
      currentAccordeon !== allAccordeons[i]
    ) {
      resetMaxHeight(allAccordeons[i].nextElementSibling);
      allAccordeons[i].classList.remove(ACTIVE_ACCORDEON_CLASS);
    }
  }
};

const onAccorderButtonClick = function (evt) {
  const button = evt.target;
  const wrapper = button.nextElementSibling;

  button.classList.toggle(ACTIVE_ACCORDEON_CLASS);
  if (wrapper.style.maxHeight) {
    resetMaxHeight(wrapper);
  } else {
    wrapper.style.maxHeight = `${wrapper.scrollHeight}px`;
    closeAccordeons(button,accordeonButtons);
  }
};

const addAccordeonButtonsHandler = function (button) {
  if (button) {
    button.addEventListener('click', onAccorderButtonClick);
  }
};

for (let i = 0; i < accordeonButtons.length; i++) {
  if (accordeonButtons[i]) {
    addAccordeonButtonsHandler(accordeonButtons[i]);
    accordeonButtons[i].classList.remove(NOJS_ACCORDEON_CLASS);
    accordeonButtons[i].nextElementSibling.classList.remove(NOJS_WRAPPER_CLASS);
  }
}

// Основные функции для взаимодействия с popup
const closeModal = () => {
  if (popup) {
    popup.classList.remove(MODAL_SHOW_CLASS);
  }

  if (overlay) {
    overlay.classList.remove(MODAL_SHOW_CLASS);
  }
};

const openModal = () => {
  if (popup) {
    popup.classList.add(MODAL_SHOW_CLASS);
  }

  if (overlay) {
    overlay.classList.add(MODAL_SHOW_CLASS);
  }
};

// Функции для обработки событий
const isEscKeydown = function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closeModal();
  }
};

const onOverlayClick = () => {
  closeModal();
};

const onPopupCloseClick = function (evt) {
  evt.preventDefault();
  closeModal();
};

// Добавление и удаление обработчиков событий
const addPopupListeners = () => {
  document.addEventListener('keydown', isEscKeydown);

  if (popupClose) {
    popupClose.addEventListener('click', onPopupCloseClick);
  }

  if (overlay) {
    overlay.addEventListener('click', onOverlayClick);
  }
};

if (openPopupButton) {
  openPopupButton.addEventListener('click', () => {
    openModal();
    addPopupListeners();
  });
}
