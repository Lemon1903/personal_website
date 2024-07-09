const scrollToTop = document.querySelector(".scroll-to-top");
const contactForm = document.querySelector(".contact__form");

scrollToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

const PUBLIC_KEY = "f2bgHE-1RPZQ1Au_p";
const SERVICE_ID = "service_odtvfrc";
const TEMPLATE_ID = "template_p626kyh";

// Initialize EmailJS with your user ID
emailjs.init({ publicKey: PUBLIC_KEY });

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // form validation
  const formData = new FormData(contactForm);
  const hasError = validateForm(formData);

  if (hasError) return;

  // Send an email using the template and form data
  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm).then(
    () => {
      console.log("SUCCESS!");
      alert("Email sent successfully!");
      contactForm.reset();
    },
    (error) => {
      console.log("FAILED...", error);
      alert("Failed to send email. Please try again.");
    }
  );
});

function validateForm(formData) {
  let hasError = false;

  const name = formData.get("name").trim();
  if (name === "") {
    hasError = showError("name");
  } else {
    hideError("name");
  }

  const email = formData.get("email").trim();
  const emailRegex = /\S+@\S+\.\S+/;
  if (email === "") {
    hasError = showError("email");
  } else if (!emailRegex.test(email)) {
    hasError = showError("email", "Invalid email address");
  } else {
    hideError("email");
  }

  const message = formData.get("message").trim();
  if (message === "") {
    hasError = showError("message");
  } else {
    hideError("message");
  }

  return hasError;
}

function showError(name, message) {
  const input = contactForm.querySelector(`[name="${name}"]`);
  const error = input.nextElementSibling;
  input.classList.add("error");
  error.classList.add("show");
  error.textContent = message ?? `This field is required`;
  return true;
}

function hideError(name) {
  const input = contactForm.querySelector(`[name="${name}"]`);
  const error = input.nextElementSibling;
  input.classList.remove("error");
  error.classList.remove("show");
}
