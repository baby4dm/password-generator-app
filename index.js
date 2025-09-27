const slider = document.querySelector(".length-input");
const lengthValue = document.querySelector(".length-value");
const generateButton = document.querySelector(".generate-button");
const passwordDisplay = document.querySelector(".created-password");
const checkboxes = document.querySelectorAll(".option input[type='checkbox']");
const upperCheckbox = checkboxes[0];
const lowerCheckbox = checkboxes[1];
const numberCheckbox = checkboxes[2];
const symbolCheckbox = checkboxes[3];
const bars = document.querySelectorAll(".strength-indicator .bar");
const strengthLabel = document.querySelector(".strength");

function updateSliderBackground() {
  const value = slider.value;
  const max = slider.max;
  const percentage = (value / max) * 100;
  lengthValue.textContent = value;
  slider.style.background = `linear-gradient(to right, #a4ffaf 0%, #a4ffaf ${percentage}%, #18171f ${percentage}%, #18171f 100%)`;
}
updateSliderBackground();
slider.addEventListener("input", updateSliderBackground);

function getCharacterSet() {
  let charset = "";
  if (upperCheckbox.checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lowerCheckbox.checked) charset += "abcdefghijklmnopqrstuvwxyz";
  if (numberCheckbox.checked) charset += "0123456789";
  if (symbolCheckbox.checked) charset += "!@#$%^&*()_+-={}[]|:;<>,.?/";
  return charset;
}

function generatePassword() {
  const length = parseInt(slider.value);
  const charset = getCharacterSet();
  if (!charset) {
    passwordDisplay.textContent = "Select at least one option!";
    updateStrength("");
    return;
  }
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  passwordDisplay.textContent = password;
  updateStrength(password);
}

function updateStrength(password) {
  let score = 0;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 12 && score >= 3) score++;

  let label = "WEAK",
    color = "#F64A4A",
    barsCount = 1;

  if (score <= 2) {
    label = "WEAK";
    color = "#F64A4A";
    barsCount = 1;
  } else if (score === 3) {
    label = "MEDIUM";
    color = "#F8CD65";
    barsCount = 3;
  } else {
    label = "STRONG";
    color = "#A4FFAF";
    barsCount = 4;
  }

  strengthLabel.textContent = label;
  bars.forEach((bar, i) => {
    if (i < barsCount) {
      bar.style.backgroundColor = color;
    } else {
      bar.style.backgroundColor = "transparent";
    }
  });
}

const copyText = document.querySelector(".copied-text");
const copyIcon = document.querySelector(".copy-icon");

copyIcon.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordDisplay.textContent);
  copyText.classList.remove("hidden");
  setTimeout(() => copyText.classList.add("hidden"), 1000);
});

generateButton.addEventListener("click", generatePassword);
