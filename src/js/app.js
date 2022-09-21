import * as functions  from "./files/functions.js";
import * as scrollToBlock  from "./files/scroll.js";
import * as forms from "./files/forms.js";

forms.formInit();

//Проверка на Webp
functions.isWebp();

functions.ibg();

//Подключаем споллеры
functions.spollers();

//Подключаем табы
functions.tabs();

scrollToBlock.pageNavigation();

// Динамичесский адаптив
// import "./files/dynamic_adapt.js";

//Подключение файла swiper
import "./files/swiper.js";


//Подключение календаря
import "./files/datepicker.js";

//Подключение своего кода
import "./files/script.js";

