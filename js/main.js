document.addEventListener('DOMContentLoaded', () => {
	const range = document.querySelector('#range');
	const rangeValue = document.querySelector('#range-value');
	const userName = document.querySelector('#username');
	const email = document.querySelector('#email');
	const password = document.querySelector('#password');
	const confirmPassword = document.querySelector('#confirmPassword');

	//range
	rangeValue.textContent = range.value + "$";
	range.oninput = () => {
		rangeValue.textContent = range.value + "$";
	};
	
	// form Validation
	class Validator{
		constructor(form, reqInputs) {
			this.form = document.querySelector('form');
			this.reqInputs = document.querySelectorAll('._req');
			this.errorMessages = {
				username: 'First name must be at least three characters',
				email: 'Email must not contain only spaces',
				password: 'Password must be at least six characters',
				confirmPassword: 'Confirm password must be match the password field'
   		};
		}

		validate(input, value) {
			if (input === 'username') {
			if (value.trim().length < 3) {
				this.showError(input, this.errorMessages[input]);
				return false;
			}
			this.hideError(input);
			return true;
			} else if (input === 'email') {
				const emailRegex = /\S+@\S+\.\S+/;
				if (!emailRegex.test(value.trim())) {
				this.showError(input, this.errorMessages[input]);
				return false;
				}
				this.hideError(input);
				return true;
			} else if (input === 'password') {
				if (value.trim().length < 6) {
				this.showError(input, this.errorMessages[input]);
				return false;
				}
				this.hideError(input);
				return true;
			} else if (input === 'confirmPassword') {
				if (value.trim().length < 6 || value.trim() !== document.querySelector('#password').value.trim()) {
				this.showError(input, this.errorMessages[input]);
				return false;
				}
				this.hideError(input);
				return true;
			} else {
				return true;
			}
		
		}

		showError(input, massage) {
			const errorElement = document.querySelector(`.${input}-error`);
			errorElement.innerHTML = massage;
			errorElement.style.display = 'block';
		}
		hideError(input) {
			const errorElement = document.querySelector(`.${input}-error`);
			errorElement.style.display = 'none';
		}

		init() {
			this.form.addEventListener('submit', (e) => {
				e.preventDefault();

				for (let elem of this.form.elements) {

					if (elem.classList.contains('_req')) {
						if (elem.value.trim() === '') {
							elem.nextElementSibling.textContent = 'Fill in the required field';
						} else {
							elem.nextElementSibling.textContent = '';
						}
					}
				}	
			});
		}
	}
	
	let validator = new Validator();

	validator.init();

	userName.addEventListener('blur', () => {
		validator.validate('username', userName.value)
	});

	email.addEventListener('blur', () => {
		validator.validate('email', email.value)
	});

	password.addEventListener('blur', () => {
		validator.validate('password', password.value)
	});

	confirmPassword.addEventListener('blur', () => {
		validator.validate('confirmPassword', confirmPassword.value)
	});


});