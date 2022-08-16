
export function formInit() {
	const form = document.querySelector('.form-feedback');

	form.addEventListener("submit", formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);

		if (error === 0) {
			form.classList.add('_sending');
			document.body.classList.add('_lock');

			document.querySelector('.modal-form').innerHTML = `
				<img src="img/spinner.svg" alt="spinner">
			`;

			let response = await fetch('files/sendmail.php', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				let result = await response.json();
				addModal('.modal-form', 'Успешно отправлено');
			} else {
					addModal('.modal-form', 'Произошла ошибка');
			}

			setTimeout(closeModal, 2000);
			document.querySelector('.form-feedback__item_checkbox').classList.remove('_active');
			form.reset();
		} 
	}


	function addModal(modal, title) {
		const modalWindow = document.querySelector(modal);

		modalWindow.innerHTML = `
			<div class="modal-form__content">
				<h2 class="modal-form__title">${title}</h2>
				<button class="modal-form__btn btn">Закрыть</button>
			</div>
		`;
	}

	//Валидация формы
	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('[data-req]');

		formReq.forEach(input => {
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			}
			if (input.classList.contains('_name')) {
				if (!input.value) {
					formAddError(input);
					error++;
				}
			}
			if (input.classList.contains('_message')) {
				if (!input.value) {
					formAddError(input);
					error++;
				}
			}
			if (input.classList.contains('form-feedback__checkbox')) {
				if (!input.parentElement.classList.contains('_active')) {
					formAddError(input);
					error++;
				}
			}
		});
		return error;
	}

	// проверяем на правильность емейл
  function emailTest (input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

	//Показ ошибки
	function formAddError(input) {
			input.parentElement.classList.add('_error');
	}

	//Удаление ошибки
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
	}

}

//Стилизация checkbox

export function stylingCheckbox() {
	const checkboxBox = document.querySelector('.form-feedback__item_checkbox'),
				checkboxBoxInput = checkboxBox.querySelector('input');

	if (checkboxBoxInput.checked) {
		checkboxBox.classList.add('_active');
	} else {
		checkboxBox.classList.remove('_active');
	}
}

//закрытие модалки
export function closeModal() {
	document.querySelector('.form-feedback').classList.remove('_sending');
	document.body.classList.remove('_lock');
}