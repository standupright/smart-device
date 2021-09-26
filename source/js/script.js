const accordeonButtons = document.querySelectorAll('#accordeon-button');
const activeAccordeonClass = 'accordeon--active';

// accordeon
const resetMaxHeight = (element) => {
  element.style.maxHeight = null;
};

const closeAccordeons = (currentAccordeon, allAccordeons) => {
  for (let i = 0; i < allAccordeons.length; i++) {
    if (
      allAccordeons[i].classList.contains(activeAccordeonClass)
      &&
      currentAccordeon !== allAccordeons[i]
    ) {
      resetMaxHeight(allAccordeons[i].nextElementSibling);
      allAccordeons[i].classList.remove(activeAccordeonClass);
    }
  }
};

const addAccordeonButtonsHandler = function (button) {
  button.addEventListener('click', function () {
    this.classList.toggle(activeAccordeonClass);
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
  addAccordeonButtonsHandler(accordeonButtons[i]);
}
