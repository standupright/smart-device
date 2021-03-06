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

// ?????????? ?? ?????????? questionnaire
const formQuestion = document.querySelector('#question-form');
const nameForm = document.querySelector('#name');
const telForm = document.querySelector('#tel');
const areaQuestionForm = document.querySelector('#area-question');
const agreeCheckoboxForm = document.querySelector('#agree-checkbox');

// ???????????????? ?????????????? ?????? ???????????????????????????? ?? popup
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

// ?????????????? ?????? ?????????????????? ??????????????
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

// ???????????????????? ?? ???????????????? ???????????????????????? ??????????????
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

// ?????????????????? ????????
const setNameCustomValidity = function (evt) {
  if (evt.target.validity.valueMissing) {
    evt.target.setCustomValidity('???????????????????????? ????????');
  } else {
    evt.target.setCustomValidity('');
  }
};

const setTelCustomValidity = function (evt) {
  if (evt.target.validity.valueMissing || evt.target.validity.patternMismatch) {
    evt.target.setCustomValidity('???????????????? ?????????? ????????????????');
  } else {
    evt.target.setCustomValidity('');
  }
};

const setCheckboxCustomValidity = function (evt) {
  if (evt.target.validity.valueMissing) {
    evt.target.setCustomValidity('?????????????????????? ???????????????? ???? ?????????????????? ???????????????????????? ????????????');
  } else {
    evt.target.setCustomValidity('');
  }
};

const onFocusTel = function (evt) {
  if (evt.target.value === '') {
    evt.target.value = '+7(';
  }
};

const setPhoneMask = function () {
  let arr = this.value;
  arr.replace(/[^\dA-Z]/g, '').split('');

  if (arr.length > 5 && arr.length < 7) {
    arr = arr.concat(')');
  }

  if (arr.length > 9 && arr.length < 11) {
    arr = arr.concat('-');
  }

  if (arr.length > 12 && arr.length < 14) {
    arr = arr.concat('-');
  }

  this.value = arr.toString().replace(/[,]/g, '');
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

// ?????????????????? ?????????? ?????????? question
if (nameForm) {
  nameForm.addEventListener('invalid', setNameCustomValidity);
}

if (telForm) {
  telForm.addEventListener('invalid', setTelCustomValidity);
  telForm.addEventListener('focus', onFocusTel);
  telForm.addEventListener('input', setPhoneMask);
}

if (agreeCheckoboxForm) {
  agreeCheckoboxForm.addEventListener('invalid', setCheckboxCustomValidity);
}

// ???????????????????? ???????????? ?? localstorage
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

// ???????????????????? ???????????? ???? localStorage ?? ??????????

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

// ?????????????? ???????????????? Modal ??????????
const onSubmitPopupForm = function (evt) {
  evt.preventDefault();

  if (isStorageSupport) {
    localStorage.setItem('name', popupName.value);
    localStorage.setItem('tel', popupTel.value);
    localStorage.setItem('question', popupArea.value);
  }
  popupName.value = '';
  popupTel.value = '';
  popupArea.value = '';
  popupAgreeCheckox.checked = false;
  closeModal();
};

if (popupForm) {
  popupForm.addEventListener('submit', onSubmitPopupForm);
}

// ?????????????? ???????????????? ?????????? question
const onSubmitQuestionForm = function (evt) {
  evt.preventDefault();

  if (isStorageSupport) {
    localStorage.setItem('name', nameForm.value);
    localStorage.setItem('tel', telForm.value);
    localStorage.setItem('question', areaQuestionForm.value);
  }

  nameForm.value = '';
  telForm.value = '';
  areaQuestionForm.value = '';
  agreeCheckoboxForm.checked = false;
};

// ?????????????? ???????????????? ?????????? ?? ?????????? question
if (formQuestion) {
  formQuestion.addEventListener('submit', onSubmitQuestionForm);
}
