import Swiper, { Navigation, EffectFade } from "swiper";

//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	// sliders_bild_callback();
}


let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			observer: true,
			observeParents: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}


if (document.querySelector('.slider-date__body')) {
	new Swiper('.slider-date__body', {
		modules: [Navigation, EffectFade],
		slidesPerView: 1, 
		spaceBetween: 10,
		watchOverflow: true,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		preloadImages: true,
		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},
		navigation: {
			nextEl: " .slider-date .slider-arrow_next",
			prevEl: " .slider-date .slider-arrow_prev",
		}
	});
}

//slider-cars__body

if (document.querySelector('.slider-cars__body')) {
	new Swiper('.slider-cars__body', {
		slidesPerView: 4, 
		spaceBetween: 0,
		watchOverflow: false,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		preloadImages: true,

		breakpoints: {
			767: {
				slidesPerView: 4, 
			},
			500: {
				centeredSlides: true,
				slidesPerView: 3, 
			},
			320: {
				centeredSlides: true,
				slidesPerView: 1.5, 
			},
		}
	});
}
