document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    validateForm();
});
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (username && email && password) {
      document.getElementById('signup-message').innerText = 'Signed up successfully!';
    }
  });
document.getElementById('name').addEventListener('input', validateName);
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('password').addEventListener('input', validatePassword);
document.getElementById('confirmPassword').addEventListener('input', validateConfirmPassword);
document.getElementById('dob').addEventListener('input', validateDOB);

function validateForm() {
    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validateDOB();
    

    if (isFormValid()) {
        alert("Form submitted successfully!");
        document.getElementById('signup-form').submit();
    }
}

function validateName() {
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    
    const namePattern = /^[A-Za-z\s]{3,}$/;
    
    if (!namePattern.test(nameInput.value)) {
        nameError.textContent = "Name must be at least 3 characters long and contain only alphabets and spaces.";
        nameInput.classList.add('border-red-500');
        nameError.classList.add('error-visible');
    } else {
        nameError.classList.remove('error-visible');
        nameInput.classList.remove('border-red-500');
    }
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address.";
        emailInput.classList.add('border-red-500');
        emailError.classList.add('error-visible');
    } else {
        emailError.classList.remove('error-visible');
        emailInput.classList.remove('border-red-500');
    }
}

function validatePassword() {
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');
    
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    if (!passwordPattern.test(passwordInput.value)) {
        passwordError.textContent = "Password must be at least 8 characters long and contain both letters and numbers.";
        passwordInput.classList.add('border-red-500');
        passwordError.classList.add('error-visible');
    } else {
        passwordError.classList.remove('error-visible');
        passwordInput.classList.remove('border-red-500');
    }
}

function validateConfirmPassword() {
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const passwordInput = document.getElementById('password');
    
    if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.textContent = "Passwords do not match.";
        confirmPasswordInput.classList.add('border-red-500');
        confirmPasswordError.classList.add('error-visible');
    } else {
        confirmPasswordError.classList.remove('error-visible');
        confirmPasswordInput.classList.remove('border-red-500');
    }
}

function validateDOB() {
    const dobInput = document.getElementById('dob');
    const dobError = document.getElementById('dobError');
    
    const dob = new Date(dobInput.value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    const dayDifference = today.getDate() - dob.getDate();
    
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }
    
    if (age < 18) {
        dobError.textContent = "You must be at least 18 years old.";
        dobInput.classList.add('border-red-500');
        dobError.classList.add('error-visible');
        document.getElementById('submitBtn').disabled = true;
    } else {
        dobError.classList.remove('error-visible');
        dobInput.classList.remove('border-red-500');
        document.getElementById('submitBtn').disabled = false;
    }
}

function isFormValid() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const dobInput = document.getElementById('dob');
    
    return (
        nameInput.value.trim() !== '' &&
        emailInput.value.trim() !== '' &&
        passwordInput.value.trim() !== '' &&
        confirmPasswordInput.value.trim() !== '' &&
        dobInput.value.trim() !== '' &&
        !document.querySelector('.border-red-500')
    );
}