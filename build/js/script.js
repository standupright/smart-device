const accordeonButtons = document.querySelectorAll('#accordeon-button');
const ACTIVE_ACCORDEON_CLASS = 'accordeon__button--active';
const NOJS_ACCORDEON_CLASS = 'accordeon__button--nojs';
const NOJS_WRAPPER_CLASS = 'accordeon__wrapper--nojs';

// accordeon
const resetMaxHeight = (element) => {
  element.style.maxHeight = null;
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

const addAccordeonButtonsHandler = function (button) {
  button.addEventListener('click', function () {
    this.classList.toggle(ACTIVE_ACCORDEON_CLASS);
    const wrapper = this.nextElementSibling;
    if (wrapper.style.maxHeight) {
      resetMaxHeight(wrapper);
    } else {
      wrapper.style.maxHeight = `${wrapper.scrollHeight}px`;
      closeAccordeons(this,accordeonButtons);
    }
  });
};

for (let i = 0; i < accordeonButtons.length; i++) {
  if (accordeonButtons[i]) {
    addAccordeonButtonsHandler(accordeonButtons[i]);
    accordeonButtons[i].classList.remove(NOJS_ACCORDEON_CLASS);
    accordeonButtons[i].nextElementSibling.classList.remove(NOJS_WRAPPER_CLASS);
  }
}
