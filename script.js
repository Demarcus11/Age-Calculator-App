const form = document.querySelector(".age-form"),
  formInputs = document.querySelectorAll(".form-input"),
  inputs = document.querySelectorAll(".form-input"),
  emptyErrorMessages = document.querySelectorAll(".empty-error"),
  dayInput = document.querySelector('input[name="day"]'),
  monthInput = document.querySelector('input[name="month"]'),
  yearInput = document.querySelector('input[name="year"]'),
  dayLabel = document.querySelector('label[for="day"]'),
  monthLabel = document.querySelector('label[for="month"]'),
  yearLabel = document.querySelector('label[for="year"]'),
  dayError = document.getElementById("day-error"),
  monthError = document.getElementById("month-error"),
  yearError = document.getElementById("year-error"),
  dayEmpty = document.getElementById("day-empty"),
  monthEmpty = document.getElementById("month-empty"),
  yearEmpty = document.getElementById("year-empty"),
  days = document.querySelector('[data-number="789"]'),
  months = document.querySelector('[data-number="456"]'),
  years = document.querySelector('[data-number="123"]');

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (areInputsEmpty()) {
  } else if (!validateDay() || !validateMonth() || !validateYear()) {
    showError(dayInput, dayLabel, dayError, "Must be a valid date");
    showError(monthInput, monthLabel, monthError, "");
    showError(yearInput, yearLabel, yearError, "");
  } else {
    removeError(dayInput, dayLabel, dayError);
    removeError(monthInput, monthLabel, monthError);
    removeError(yearInput, yearLabel, yearError);

    let yearsValue = parseInt(yearInput.value.trim());
    let monthsValue = parseInt(monthInput.value.trim());
    let daysValue = parseInt(dayInput.value.trim());
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    // Months are 0-indexed, add 1 to get real month number
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    let yearValue = currentYear - parseInt(yearsValue);
    let monthValue = currentMonth - parseInt(monthsValue, 10);
    let dayValue = currentDay - parseInt(daysValue, 10);

    // Check if person has had their birthday this year
    if (monthValue < 0 || (monthValue === 0 && dayValue < 0)) {
      yearValue--;
    }

    // Carry over the years if current month is less than birth month
    if (monthValue < 0) {
      monthValue += 12;
    }

    animateNumber(yearValue, years);
    animateNumber(monthValue, months);
    animateNumber(dayValue, days);
  }
});

function animateNumber(number, element) {
  let interval = 5000;

  let start = 0;
  let end = number;
  let duration = Math.floor(interval / end);
  let counter = setInterval(function () {
    start += 1;
    element.textContent = start;

    if (start === end) {
      clearInterval(counter);
    }
  }, duration);
}

function validateDay() {
  let day = dayInput.value.trim();
  let month = parseInt(monthInput.value.trim());
  if (isNaN(day) || day < 1 || day > daysInMonth(month)) {
    showError(dayInput, dayLabel, dayError, "Must be a valid day");
    return false;
  } else {
    removeError(dayInput, dayLabel, dayError);
    return true;
  }
}

function validateMonth() {
  let month = parseInt(monthInput.value.trim());

  if (isNaN(month) || month < 1 || month > 12) {
    showError(monthInput, monthLabel, monthError, "Must be a valid month");
    return false;
  } else {
    removeError(monthInput, monthLabel, monthError);
    return true;
  }
}

function validateYear() {
  let year = parseInt(yearInput.value.trim());

  if (year > 2023 || isNaN(year)) {
    showError(yearInput, yearLabel, yearError, "Must be in the past");
    return false;
  } else {
    removeError(yearInput, yearLabel, yearError);
    return true;
  }
}

function daysInMonth(month) {
  const thirtyOneDayMonths = [1, 3, 5, 7, 8, 10, 12];
  const thirtyDayMonths = [4, 6, 9, 11];

  if (thirtyOneDayMonths.includes(month)) {
    return 31;
  } else if (thirtyDayMonths.includes(month)) {
    return 30;
  } else {
    // February
    return 28;
  }
}

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    if (e.target.name === "day") {
      if (dayInput.value !== "") {
        dayEmpty.textContent = "";
        dayLabel.classList.remove("error-label");
        dayInput.classList.remove("error-br");
        return false;
      }
    }

    if (e.target.name === "month") {
      if (monthInput.value !== "") {
        monthEmpty.textContent = "";
        monthLabel.classList.remove("error-label");
        monthInput.classList.remove("error-br");
        return false;
      }
    }

    if (e.target.name === "year") {
      if (yearInput.value !== "") {
        yearEmpty.textContent = "";
        yearLabel.classList.remove("error-label");
        yearInput.classList.remove("error-br");
        return false;
      }
    }
  });
});

function areInputsEmpty() {
  let day = dayInput.value.trim();
  let month = monthInput.value.trim();
  let year = yearInput.value.trim();

  // Array to hold empty inputs, push an input to the array if its empty then loop through the array to display error message to the empty inputs
  let emptyInputs = [];

  if (day === "") {
    dayEmpty.textContent = "This field is required";
    dayInput.classList.add("error-br");
    dayLabel.classList.add("error-label");
    emptyInputs.push(dayInput);
  } else {
    dayEmpty.textContent = "";
    dayInput.classList.remove("error-br");
    dayLabel.classList.remove("error-label");
  }

  if (month === "") {
    monthEmpty.textContent = "This field is required";
    monthInput.classList.add("error-br");
    monthLabel.classList.add("error-label");
    emptyInputs.push(monthInput);
  } else {
    monthEmpty.textContent = "";
    monthInput.classList.remove("error-br");
    monthLabel.classList.remove("error-label");
  }

  if (year === "") {
    yearEmpty.textContent = "This field is required";
    yearInput.classList.add("error-br");
    yearLabel.classList.add("error-label");
    emptyInputs.push(yearInput);
  } else {
    yearEmpty.textContent = "";
    yearInput.classList.remove("error-br");
    yearLabel.classList.remove("error-label");
  }

  for (let i = 0; i < emptyInputs.length; i++) {
    // Since the error message p tag is directly under the input in the HTML we can use nextElementSibling to access it
    emptyInputs[i].nextElementSibling.textContent = "This field is required";
  }

  return emptyInputs.length > 0;
}

function showError(inputElement, label, errorElement, errorMessage) {
  errorElement.textContent = errorMessage;
  inputElement.classList.add("error-br");
  label.classList.add("error-label");
}

function removeError(inputElement, label, errorElement) {
  errorElement.textContent = "";
  inputElement.classList.remove("error-br");
  label.classList.remove("error-label");
}

function clearError() {
  inputs.forEach((input) => {
    input.addEventListener("blur", (event) => {
      if (event.target.value === "") {
        if (event.target.name === "day") {
          days.textContent = "- -";
          dayEmpty.textContent = "";
          dayError.textContent = "";
          dayInput.classList.remove("error-br");
          dayLabel.classList.remove("error-label");
        }
        if (event.target.name === "month") {
          months.textContent = "- -";
          monthEmpty.textContent = "";
          monthError.textContent = "";
          monthInput.classList.remove("error-br");
          monthLabel.classList.remove("error-label");
        }
        if (event.target.name === "year") {
          years.textContent = "- -";
          yearEmpty.textContent = "";
          yearError.textContent = "";
          yearInput.classList.remove("error-br");
          yearLabel.classList.remove("error-label");
        }
      }
    });
  });
}
