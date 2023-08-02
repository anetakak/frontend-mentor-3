const inputItems = document.querySelectorAll(".input-item");
const inputDay = document.querySelector("#day");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");
const errorDay = document.querySelector(".error-day");
const errorMonth = document.querySelector(".error-month");
const errorYear = document.querySelector(".error-year");
const btn = document.querySelector(".arrow");
const resultDays = document.querySelector(".result-days");
const resultMonths = document.querySelector(".result-months");
const resultYears = document.querySelector(".result-years");

const currentDate = new Date();

const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const leapYear = () => {
	if (
		inputYear.value % 400 == 0 ||
		(inputYear.value % 100 != 0 && inputYear.value % 4 == 0)
	) {
		monthLength[1] = 29;
	} else {
		monthLength[1] = 28;
	}
};

const enterCheck = () => {
	if (event.key === "Enter") {
		formValidation();
	}
};

const formValidation = () => {
	clearError();
	inputItems.forEach((inputItem) => {
		if (inputItem.children[1].value === "") {
			inputItem.children[2].textContent = "This field is required";
			inputItem.children[0].classList.add("error-label");
			inputItem.children[1].classList.add("error-input");
		}
	});
	if (
		[...inputItems].every((inputItem) => inputItem.children[1].value !== "")
	) {
		checkDayMonthYear();
	}
};

const checkDayMonthYear = () => {
	clearError();
	if (inputDay.value < 1 || inputDay.value > 31) {
		errorDay.textContent = "Must be a valid day";
		errorDay.previousElementSibling.previousElementSibling.classList.add(
			"error-label"
		);
		errorDay.previousElementSibling.classList.add("error-input");
	}
	if (inputMonth.value < 1 || inputMonth.value > 12) {
		errorMonth.textContent = "Must be a valid month";
		errorMonth.previousElementSibling.previousElementSibling.classList.add(
			"error-label"
		);
		errorMonth.previousElementSibling.classList.add("error-input");
	}
	if (inputYear.value > currentDate.getFullYear()) {
		errorYear.textContent = "Must be in the past";
		errorYear.previousElementSibling.previousElementSibling.classList.add(
			"error-label"
		);
		errorYear.previousElementSibling.classList.add("error-input");
	}
	if (
		errorDay.textContent === "" &&
		errorMonth.textContent === "" &&
		errorYear.textContent === ""
	) {
		checkDate();
	}
};

const checkDate = () => {
    leapYear()
	if (
		inputDay.value <= monthLength[inputMonth.value - 1] &&
		inputMonth.value >= 1 &&
		inputMonth.value <= 12 &&
		inputYear.value <= currentDate.getFullYear()
	) {
		calculateAge();
	} else {
		errorDay.textContent = "Must be a valid date";
		errorDay.previousElementSibling.previousElementSibling.classList.add(
			"error-label"
		);
		errorMonth.previousElementSibling.previousElementSibling.classList.add(
			"error-label"
		);
		errorYear.previousElementSibling.previousElementSibling.classList.add(
			"error-label"
		);
		errorDay.previousElementSibling.classList.add("error-input");
		errorMonth.previousElementSibling.classList.add("error-input");
		errorYear.previousElementSibling.classList.add("error-input");
	}
};

const calculateAge = () => {
	const usersDate = new Date(
		`${inputMonth.value} ${inputDay.value} ${inputYear.value}`
	);

    let yearDiff = currentDate.getFullYear() - usersDate.getFullYear();
    let monthDiff = currentDate.getMonth() - usersDate.getMonth();
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
    let dayDiff = currentDate.getDate() - usersDate.getDate();
    if (dayDiff < 0) {
      if (monthDiff > 0) {
        monthDiff--;
      } else {
        yearDiff--;
        monthDiff = 11;
      }
      dayDiff += monthLength[usersDate.getMonth()];
    }

	resultYears.textContent = yearDiff
	resultMonths.textContent = monthDiff
	resultDays.textContent = dayDiff
};

const clearError = () => {
	inputItems.forEach((inputItem) => {
		inputItem.children[2].textContent = "";
		inputItem.children[1].classList.remove("error-input");
		inputItem.children[0].classList.remove("error-label");
	});
};

btn.addEventListener("click", formValidation);
window.addEventListener("keyup", enterCheck)