// Get current date
const date = new Date();

// Select form and input elements
const $form = document.querySelector("form");
const $nameV = document.querySelector("#name");
const $numberV = document.querySelector("#cNumber");
const $monthV = document.querySelector("#month");
const $yearV = document.querySelector("#year");
const $cvcV = document.querySelector("#cvc");

// Function to change display between two elements
const changeDisplay = (showClass, hideClass) => {
  document.querySelector(`.${showClass}`).classList.add("displayOn");
  document.querySelector(`.${showClass}`).classList.remove("displayOf");
  document.querySelector(`.${hideClass}`).classList.add("displayOf");
  document.querySelector(`.${hideClass}`).classList.remove("displayOn");
};

// Function to reset input values
const resetValues = (element) => {
  element.value = "";
};

// Function to set default values for card display
const setValues = () => {
  document.querySelector(".cName").textContent = "Temur Chkonia";
  document.querySelector(".cardN").textContent = "0000 0000 0000 0000";
  document.querySelector(".cDate").textContent = "00/00";
  document.querySelector(".cvcBC").textContent = "000";
};

// Function to add error class to input
const addErrClass = (input) => {
  if (!input.classList.contains("inputerr")) {
    input.classList.add("inputerr");
  }
};

// Function to remove error class from input
const delErrClass = (input) => {
  if (input.classList.contains("inputerr")) {
    input.classList.remove("inputerr");
  }
};

// Function to validate name input
const validateName = () => {
  const mError = document.querySelectorAll(".error")[0];
  if ($nameV.value === "") {
    mError.textContent = "Can't be empty";
    addErrClass($nameV);
  } else if ($nameV.value.match(/[^a-zA-Z\s]/g)) {
    mError.textContent = "Can't be numbers";
    addErrClass($nameV);
  } else {
    delErrClass($nameV);
    mError.textContent = "";
    return true;
  }
};

// Function to validate card number input
const validateCNumber = () => {
  const mError = document.querySelectorAll(".error")[1];
  if ($numberV.value === "") {
    mError.textContent = "Can't be empty";
    addErrClass($numberV);
  } else if ($numberV.value.match(/[^0-9]/g)) {
    mError.textContent = "Wrong format, numbers only";
    addErrClass($numberV);
  } else if ($numberV.value.length !== 16) {
    mError.textContent = "Invalid card number";
    addErrClass($numberV);
  } else {
    delErrClass($numberV);
    mError.textContent = "";
    return true;
  }
};

// Function to validate expiration date input
const validateDate = () => {
  const mError = document.querySelectorAll(".error")[2];
  const currentYear = date.getFullYear().toString().substring(2, 4);
  const currentMonth = date.getMonth() + 1;

  if ($monthV.value === "" || $yearV.value === "") {
    addErrClass($monthV);
    addErrClass($yearV);
    mError.textContent = "Can't be empty";
  } else if (
    $monthV.value > 12 ||
    $monthV.value.length < 2 ||
    $monthV.value < currentMonth ||
    $yearV.value.length < 2 ||
    $yearV.value < currentYear
  ) {
    addErrClass($monthV);
    addErrClass($yearV);
    mError.textContent = "Invalid date";
  } else {
    delErrClass($monthV);
    delErrClass($yearV);
    mError.textContent = "";
    return true;
  }
};

// Function to validate CVC input
const validateCVC = () => {
  const mError = document.querySelectorAll(".error")[3];
  if ($cvcV.value === "") {
    addErrClass($cvcV);
    mError.textContent = "Can't be empty";
  } else if ($cvcV.value.match(/[^0-9]/g)) {
    addErrClass($cvcV);
    mError.textContent = "Wrong format";
  } else if ($cvcV.value.length < 3) {
    addErrClass($cvcV);
    mError.textContent = "Invalid CVC";
  } else {
    delErrClass($cvcV);
    mError.textContent = "";
    return true;
  }
};

// Event listener for form submission
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateCNumber();
  validateName();
  validateDate();
  validateCVC();
  if (validateCNumber() && validateName() && validateDate() && validateCVC()) {
    changeDisplay("success", "form");
  }
});

// Event listener for keyup events on input fields
document.addEventListener("keyup", (e) => {
  if (e.target.matches("#name")) {
    const $nameC = document.querySelector(".cName");
    $nameV.value === ""
      ? ($nameC.textContent = "Temur Chkonia")
      : ($nameC.textContent = $nameV.value);
    $nameV.style.color = "black"; // Change text color to black
  }

  if (e.target.matches("#cNumber")) {
    const $numberC = document.querySelector(".cardN");
    let splitNumber = $numberV.value.split("");
    if (splitNumber.length > 4) splitNumber.splice(4, 0, " ");
    if (splitNumber.length > 9) splitNumber.splice(9, 0, " ");
    if (splitNumber.length > 14) splitNumber.splice(14, 0, " ");
    splitNumber = splitNumber.join("");
    $numberV.value === ""
      ? ($numberC.textContent = "0000 0000 0000 0000")
      : ($numberC.textContent = splitNumber);
    $numberV.style.color = "black"; // Change text color to black
  }

  if (e.target.matches("#month")) {
    const $monthC = document.querySelector(".cDate");
    let month = $monthC.textContent.split("/");
    $monthV.value === "" ? (month[0] = "00") : (month[0] = $monthV.value);
    $monthC.textContent = month.join("/");
    $monthV.style.color = "black"; // Change text color to black
  }

  if (e.target.matches("#year")) {
    const $yearC = document.querySelector(".cDate");
    let month = $yearC.textContent.split("/");
    $yearV.value === "" ? (month[1] = "00") : (month[1] = $yearV.value);
    $yearC.textContent = month.join("/");
    $yearV.style.color = "black"; // Change text color to black
  }

  if (e.target.matches("#cvc")) {
    const $cvcC = document.querySelector(".cvcBC");
    $cvcV.value === ""
      ? ($cvcC.textContent = "000")
      : ($cvcC.textContent = $cvcV.value);
    $cvcV.style.color = "black"; // Change text color to black
  }
});

// Event listener for success button click
document.querySelector(".success").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.matches("#continue")) {
    resetValues($nameV);
    resetValues($numberV);
    resetValues($monthV);
    resetValues($yearV);
    resetValues($cvcV);
    setValues();
    changeDisplay("form", "success");
  }
});

// Set default values on window load
window.addEventListener("load", () => {
  setValues();
});
