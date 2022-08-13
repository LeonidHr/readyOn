// Проверка на мобайл
import { isMobile } from "./functions.js";
import { ibg } from "./functions.js";

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", documentEvents);

  function documentEvents(e) {
    const targetElement = e.target;

    if (targetElement.closest('.header__lang span') || targetElement.closest('.header__arrow')) {
      e.preventDefault();
      document.querySelector('.header__lang').classList.toggle('_hover');
    } else if (!targetElement.closest('.header__lang')) {
      document.querySelector('.header__lang').classList.remove('_hover');
    }

    if (targetElement.closest('.icon-menu')) {
      e.preventDefault();
      document.documentElement.classList.toggle('menu-open');
      document.body.classList.toggle('_lock');
    }

    if (targetElement.classList.contains('header__lang-link')) {
      e.preventDefault();
      changeLang(targetElement);
    }

    if (targetElement.closest('.qs-square')) {
      e.preventDefault();
      addActiveDatePick(targetElement);
    }
    if (!isMobile.any()) {
      if (targetElement.closest('.mainscreen__mouse')) {
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
      }
    }

    if (targetElement.closest('.pagination-tabs-cars__item')) {
      e.preventDefault();
      carsTabs(targetElement.closest('.pagination-tabs-cars__item'));
    }
  }

  //* Функция изменения языка
  function changeLang(lang) {
    const visibleLang = document.querySelector('.header__lang span'),
          changeLang = lang.innerHTML;

    lang.innerHTML = visibleLang.innerHTML;
    visibleLang.innerHTML = changeLang;
  }

  //* Изменение хедера при прокрутке
  const headerElement = document.querySelector('.header');

  const callback = function(entries, observer) {
    if (entries[0].isIntersecting) {
      headerElement.classList.remove('_scroll');
    } else {
      headerElement.classList.add('_scroll');
    }
  };

  const headerObserver = new IntersectionObserver(callback);
  headerObserver.observe(headerElement);


  //* ======================================================
  function addActiveDatePick(targetElement) {
    document.querySelectorAll('.qs-square').forEach(item => {
      item.classList.remove('qs-active');
    });
    targetElement.closest('.qs-square').classList.add('qs-active');
  }

  //*Удаление background img с program
  function removeBg(element) {
    document.querySelectorAll(element).forEach(item => {
      if (item.classList.contains('_ibg')) {
        item.classList.remove('_ibg');
        item.style.backgroundImage = '';
        document.querySelector(`${element} img`).remove();
      }
    });
  }
  if (window.innerWidth < 767.98) {
    removeBg('.item-program');
  }

  //* Табы=========================================================================
  function carsTabs(targetEl) {
    const cars = document.querySelectorAll('.tabs-cars__car'),
          tabs = document.querySelectorAll('.pagination-tabs-cars__item');

    if (tabs.length) {
      for (let i = 0; i < cars.length; i++) {
        cars[i].classList.remove('_active');
        tabs[i].classList.remove('_active');
      }
    }      

    targetEl.classList.add('_active');
    cars[targetEl.dataset.car].classList.add('_active');
  }

  addTabsBtns();
  carsTabs(document.querySelector('.pagination-tabs-cars__item'));

  function addTabsBtns() {
    const cars = document.querySelectorAll('.tabs-cars__car'),
          tabs = document.querySelector('.pagination-tabs-cars'),
          modelName = document.querySelectorAll('.img-main-cars__title'),
          modelSrc = document.querySelectorAll('._tab-img');
      
    for (let i = 0; i < cars.length; i++) {
      tabs.insertAdjacentHTML("beforeend", `
        <button class="pagination-tabs-cars__item" data-car="${i}" type="button">
          <div class="pagination-tabs-cars__img _ibg">
            <img src="${modelSrc[i].getAttribute('src')}" alt="porshe">
          </div>
          <div class="pagination-tabs-cars__body">
            <div class="pagination-tabs-cars__name">${modelName[i].innerHTML}</div>
          </div>
        </button>
      `);
      ibg();
    }

  }

  //* Показ количества отзывов===========================================================

  function showQuantityReviews() {
    document.querySelector('.counter-reviews__estimates span').innerHTML = 
    document.querySelectorAll('.swiper-pagination-bullet').length;
  }
  showQuantityReviews();
});
