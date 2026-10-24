const form = document.getElementById("contact-form");

form.addEventListener("submit", function (event) {
  clearErrors();
  let isValid = true;

  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const linkedin = document.getElementById("linkedin").value.trim();
  const howMet = document.getElementById("how-met").value;
  const mailingList = document.getElementById("mailing-list").checked;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (firstName === "") {
    showError("first-name", "Please enter your first name.");
    isValid = false;
  }

  if (lastName === "") {
    showError("last-name", "Please enter your last name.");
    isValid = false;
  }

  if (email === "" && mailingList) {
    showError("email", "Email is required if you join the mailing list.");
    isValid = false;
  } else if (email !== "" && !emailPattern.test(email)) {
    showError("email", "Please enter a valid email, like name@example.com.");
    isValid = false;
  }

  if (linkedin !== "" && !linkedin.startsWith("https://linkedin.com/in/")) {
    showError("linkedin", "LinkedIn link must start with https://linkedin.com/in/");
    isValid = false;
  }

  if (howMet === "") {
    showError("how-met", "Please tell us how we met.");
    isValid = false;
  }

  if (!isValid) {
    event.preventDefault();
  }
});

function showError(fieldId, message) {
  document.getElementById(fieldId + "-error").textContent = message;
}

function clearErrors() {
  const errors = document.querySelectorAll(".error");
  errors.forEach(function (error) {
    error.textContent = "";
  });
}