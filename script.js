/* ==========================================================================
   KDAG Bootcamp — registration form validation & local storage
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // ---- Mobile nav menu (runs on every page that has the nav) ----
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    // Close the menu after tapping a link
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });

    // Close the menu if the viewport grows back past the mobile breakpoint
    window.addEventListener("resize", function () {
      if (window.innerWidth > 720 && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  // ---- Admin Link Security ----
  const adminLink = document.getElementById("adminLink");
  if (adminLink) {
    adminLink.addEventListener("click", function (e) {
      e.preventDefault();
      // Prompt the user for the security key
      const key = prompt("Enter Admin Security Key:");

      // Basic client-side check. The key is "KDAGadmin".
      if (key === "KDAGadmin") {
        window.location.href = "admin.html";
      } else if (key !== null && key !== "") {
        alert("Access Denied: Incorrect security key.");
      }
    });
  }

  // ---- Registration form validation & Storage (only on register.html) ----
  const form = document.getElementById("registerForm");
  if (!form) return; // Stop executing if we are not on the registration page

  const successPanel = document.getElementById("successPanel");

  const fields = {
    name: {
      input: document.getElementById("name"),
      wrap: document.getElementById("nameField"),
      validate: function (value) {
        return value.trim().length > 0;
      },
    },
    roll: {
      input: document.getElementById("roll"),
      wrap: document.getElementById("rollField"),
      validate: function (value) {
        const trimmed = value.trim();
        // Regex strictly enforces starting with 25 or 26
        const rollPattern = /^(25|26)[A-Za-z]{2}[0-9]{5}$/;
        return trimmed.length === 9 && rollPattern.test(trimmed);
      },
    },
    email: {
      input: document.getElementById("email"),
      wrap: document.getElementById("emailField"),
      validate: function (value) {
        const trimmed = value.trim();
        if (trimmed.length === 0) return false;

        // Stricter check: Must explicitly end in either @kgpian.iitkgp.ac.in or @iitkgp.ac.in
        const kgpEmailPattern = /^[a-zA-Z0-9._%+-]+@(kgpian\.)?iitkgp\.ac\.in$/i;
        return kgpEmailPattern.test(trimmed);
      },
    },
    department: {
      input: document.getElementById("department"),
      wrap: document.getElementById("deptField"),
      validate: function (value) {
        return value.trim().length > 0;
      },
    },
  };

  function setFieldError(field, hasError) {
    field.wrap.classList.toggle("has-error", hasError);
    field.input.classList.toggle("field-error", hasError);
    field.input.setAttribute("aria-invalid", hasError ? "true" : "false");
  }

  // Clear a field's error as soon as the user starts fixing it
  Object.values(fields).forEach(function (field) {
    const eventName = field.input.tagName === "SELECT" ? "change" : "input";
    field.input.addEventListener(eventName, function () {
      if (field.validate(field.input.value)) {
        setFieldError(field, false);
      }
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let allValid = true;
    let firstInvalidInput = null;

    Object.values(fields).forEach(function (field) {
      const isValid = field.validate(field.input.value);
      setFieldError(field, !isValid);
      if (!isValid) {
        allValid = false;
        if (!firstInvalidInput) firstInvalidInput = field.input;
      }
    });

    if (!allValid) {
      if (firstInvalidInput) firstInvalidInput.focus();
      return;
    }

    // --- DATA STORAGE LOGIC ---

    // 1. Package the form data into an object
    const registrationData = {
      name: fields.name.input.value.trim(),
      rollNumber: fields.roll.input.value.trim().toUpperCase(),
      email: fields.email.input.value.trim(),
      department: fields.department.input.value,
      timestamp: new Date().toISOString()
    };

    // 2. Retrieve existing registrations (or initialize empty array)
    let savedRegistrations = JSON.parse(localStorage.getItem("kdagBootcampRegistrations")) || [];

    // 3. Append new data and save back to local storage
    savedRegistrations.push(registrationData);
    localStorage.setItem("kdagBootcampRegistrations", JSON.stringify(savedRegistrations));

    // --------------------------

    // All fields valid & saved — hide the form, show the success message
    form.classList.add("hide");
    successPanel.classList.add("show");
    successPanel.setAttribute("tabindex", "-1");
    successPanel.focus();
  });
});