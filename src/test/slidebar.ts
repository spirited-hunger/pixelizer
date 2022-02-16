const slideValue = document.querySelector("span");
const inputSlider = document.querySelector("input");
inputSlider.oninput = () => {
  let value = inputSlider.value;
  slideValue.textContent = value;
  slideValue.style.left = `${4 + Number(value) * 0.46}%`;
  slideValue.classList.add("show");
};
inputSlider.onblur = () => {
  let value = inputSlider.value;
  slideValue.textContent = value;
  slideValue.style.left = `${4 + Number(value) * 0.46}%`;
  slideValue.classList.remove("show");
};

export {};
