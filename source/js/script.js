// accordeon
const accordeonButtons = document.querySelectorAll('#accordeon-button');
const ACTIVE_ACCORDEON_CLASS = 'accordeon__button--active';
const NOJS_ACCORDEON_CLASS = 'accordeon__button--nojs';
const NOJS_WRAPPER_CLASS = 'accordeon__wrapper--nojs';

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

// Modal-form
const OVERFLOW_HIDDEN = 'overflow-hidden';

const body = document.querySelector('#body');
const MODAL_SHOW_CLASS = 'modal-show';
const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const openPopupButton = document.querySelector('#request-button');
const popupForm = document.querySelector('#popup-form');
const popupName = document.querySelector('#popup-name');
const popupTel = document.querySelector('#popup-tel');
const popupArea = document.querySelector('#popup-area');
const popupAgreeCheckox = document.querySelector('#popup-agree-checkbox');

// Форма в блоке questionnaire
const formQuestion = document.querySelector('#question-form');
const nameForm = document.querySelector('#name');
const telForm = document.querySelector('#tel');
const areaQuestionForm = document.querySelector('#area-question');
const agreeCheckoboxForm = document.querySelector('#agree-checkbox');

// Основные функции для взаимодействия с popup
const closeModal = () => {
  if (popup) {
    popup.classList.remove(MODAL_SHOW_CLASS);
  }

  if (overlay) {
    overlay.classList.remove(MODAL_SHOW_CLASS);
  }

  if (body) {
    body.classList.remove(OVERFLOW_HIDDEN);
  }
};

const openModal = () => {
  if (popup) {
    popup.classList.add(MODAL_SHOW_CLASS);
  }

  if (overlay) {
    overlay.classList.add(MODAL_SHOW_CLASS);
  }

  if (body) {
    body.classList.add(OVERFLOW_HIDDEN);
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

// Валидация форм
const setNameCustomValidity = function (evt) {
  if (evt.target.validity.valueMissing) {
    evt.target.setCustomValidity('Обязательное поле');
  } else {
    evt.target.setCustomValidity('');
  }
};

const setTelCustomValidity = function (evt) {
  if (evt.target.validity.valueMissing || evt.target.validity.patternMismatch) {
    evt.target.setCustomValidity('Неверный номер телефона');
  } else {
    evt.target.setCustomValidity('');
  }
};

const setCheckboxCustomValidity = function (evt) {
  if (evt.target.validity.valueMissing) {
    evt.target.setCustomValidity('Подтвердите согласие на обработку персональных данных');
  } else {
    evt.target.setCustomValidity('');
  }
};

if (popupName) {
  popupName.addEventListener('invalid', setNameCustomValidity);
}

if (popupTel) {
  popupTel.addEventListener('invalid', setTelCustomValidity);
}

if (popupAgreeCheckox) {
  popupAgreeCheckox.addEventListener('invalid', setCheckboxCustomValidity);
}

// Валидация формы блока question
if (nameForm) {
  nameForm.addEventListener('invalid', setNameCustomValidity);
}

if (telForm) {
  telForm.addEventListener('invalid', setTelCustomValidity);
}

if (agreeCheckoboxForm) {
  agreeCheckoboxForm.addEventListener('invalid', setCheckboxCustomValidity);
}

// Добавление данных в localstorage
let isStorageSupport = true;
let storageName = '';
let storageTel = '';
let storageQuestion = '';

try {
  storageName = localStorage.getItem('name');
  storageTel = localStorage.getItem('tel');
  storageQuestion = localStorage.getItem('question');
} catch (err) {
  isStorageSupport = false;
}

// Заполнение данных из localStorage в формы

if (storageName && popupName) {
  popupName.value = storageName;
}

if (storageTel && popupTel) {
  popupTel.value = storageTel;
}

if (storageQuestion && popupArea) {
  popupArea.value = storageQuestion;
}

if (storageName && nameForm) {
  nameForm.value = storageName;
}

if (storageTel && telForm) {
  telForm.value = storageTel;
}

if (storageQuestion && areaQuestionForm) {
  areaQuestionForm.value = storageQuestion;
}

// Событие отправки Modal формы
const submitForm = function (evt) {
  evt.preventDefault();

  if (isStorageSupport) {
    localStorage.setItem('name', popupName.value);
    localStorage.setItem('tel', popupTel.value);
    localStorage.setItem('question', popupArea.value);
  }

  popupAgreeCheckox.checked = false;
  agreeCheckoboxForm.checked = false;
};

if (popupForm) {
  popupForm.addEventListener('submit', (evt) => {
    submitForm(evt);
    closeModal();
  });
}

// Событие отправки формы в блоке question
if (formQuestion) {
  formQuestion.addEventListener('submit', submitForm);
}
