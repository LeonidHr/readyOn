/* Календарь */

// Подключение модуля
import datepicker from 'js-datepicker';

if (document.querySelector('[data-datepicker]')) {
	const picker = datepicker('[data-datepicker]', {
		customDays: ["понедельник", "вторник", "среда", "четверг", "пятница", "субота", "воскресенье"],
		customMonths: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
		startDay: 1,
		formatter: (input, date, instance) => {
			const value = date.toLocaleDateString()
			input.value = value
		},
		onSelect: function (input, instance, date) {
	
		}
	});
}

function addFirstWeekBox() {
	const days = document.querySelectorAll('.qs-num');
	const div = document.createElement('div');
	div.classList.add('qs-squares_f-week');

	document.querySelector('.datepicker').insertAdjacentElement("afterbegin", div);

	for (let i = 0; i < 7; i++) {
		div.insertAdjacentHTML('beforeend', `<div class="qs-square среда qs-num" data-direction="0"><span>${days[i].innerHTML}</span></div>`);
		days[i].remove();
	}
}
addFirstWeekBox();

function addDotNums() {
	document.querySelectorAll('.review-date__number span').forEach(revNum => {
		document.querySelectorAll('.qs-num').forEach(qsNum => {
			if (revNum.innerHTML == qsNum.innerHTML) {
				qsNum.classList.add('_dot');
			}
		});
	});
	document.querySelector('.qs-num._dot').classList.toggle('qs-active');
}
addDotNums();