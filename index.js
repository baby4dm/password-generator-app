const slider  = document.querySelector(".length-input");

function updateSliderBackground() {
    const value = slider.value;
    const max = slider.max;
    const percentage = (value / max) * 100;

    slider.style.background = `linear-gradient(to right, #a4ffaf 0%, #a4ffaf ${percentage}%, #18171f ${percentage}%, #18171f 100%)`;
}

updateSliderBackground();

slider.addEventListener("input", updateSliderBackground);