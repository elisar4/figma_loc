/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/code.js":
/*!*********************!*\
  !*** ./src/code.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic.js */ "./src/logic.js");


figma.showUI(__html__)

function sendContrastInfo(contrast, foreground, backgound) {
    figma.ui.postMessage({
        type: 'selectionChange',
        foreground: Object(_logic_js__WEBPACK_IMPORTED_MODULE_0__["convertRgbToHex"])(foreground),
        background: Object(_logic_js__WEBPACK_IMPORTED_MODULE_0__["convertRgbToHex"])(backgound),
        contrast,
        scores: Object(_logic_js__WEBPACK_IMPORTED_MODULE_0__["getContrastScores"])(contrast),
    })
}

figma.on('selectionchange', () => {
    if (figma.currentPage.selection.length > 1) {
        const selection = figma.currentPage.selection.filter(
            node => node.fills.length > 0 && node.fills[0].type === 'SOLID'
        )
        const fills = selection.map(node => node.fills[0])
        foregroundColor = Object(_logic_js__WEBPACK_IMPORTED_MODULE_0__["getRGB"])(fills[0].color)
        foregroundAlpha = fills[0].opacity
        backgoundColor = Object(_logic_js__WEBPACK_IMPORTED_MODULE_0__["getRGB"])(fills[1].color)
        const contrast = Object(_logic_js__WEBPACK_IMPORTED_MODULE_0__["calculateContrast"])(
            foregroundColor,
            foregroundAlpha,
            backgoundColor,
        )
        sendContrastInfo(contrast, foregroundColor, backgoundColor)
    }
})

/***/ }),

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/*! exports provided: foregroundColor, foregroundAlpha, backgoundColor, convertRgbToHex, calculateLuminance, getRGB, getContrastScores, calculateContrast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "foregroundColor", function() { return foregroundColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "foregroundAlpha", function() { return foregroundAlpha; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backgoundColor", function() { return backgoundColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertRgbToHex", function() { return convertRgbToHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateLuminance", function() { return calculateLuminance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRGB", function() { return getRGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getContrastScores", function() { return getContrastScores; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateContrast", function() { return calculateContrast; });
var foregroundColor
var foregroundAlpha
var backgoundColor

function convertRgbToHex(color) {
    const hex = color
        .map((col) => {
            const hexColor = col.toString(16);
            return `0${hexColor}`.slice(-2);
        })
        .join("");
    return `#${hex}`;
}

function calculateLuminance(color) {
    const normalizedColor = color.map((channel) => channel / 255);
    const gammaCorrectedRGB = normalizedColor.map((channel) =>
        channel <= 0.03928 ?
        channel / 12.92 :
        Math.pow((channel + 0.055) / 1.055, 2.4)
    );
    const luminance =
        gammaCorrectedRGB[0] * 0.2126 +
        gammaCorrectedRGB[1] * 0.7152 +
        gammaCorrectedRGB[2] * 0.0722;
    return luminance;
}

function getRGB({ r, g, b }) {
    const rgbColorArray = [r, g, b].map((channel) => Math.round(channel * 255));
    return rgbColorArray;
}

function overlay(foreground, alpha, backgound) {
    if (alpha >= 1) {
        return foreground;
    }
    const overlaid = foreground.map((channel, i) =>
        Math.round(channel * alpha + backgound[i] * (1 - alpha))
    );
    return overlaid;
}

function getContrastScores(contrast) {
    let largeText;
    let normalText;
    switch (true) {
        case contrast > 7:
            largeText = "AAA";
            normalText = "AAA";
            break;
        case contrast > 4.5:
            largeText = "AAA";
            normalText = "AA";
            break;
        case contrast > 3:
            largeText = "AA";
            normalText = "FAIL";
            break;
        default:
            largeText = "FAIL";
            normalText = "FAIL";
            break;
    }
    return { largeText, normalText };
}

function calculateContrast(foreground, alpha, backgound) {
    if (alpha < 1) {
        foreground = overlay(foreground, alpha, backgound);
    }
    const foregroundLuminance = calculateLuminance(foreground) + 0.05;
    const backgroundLuminance = calculateLuminance(backgound) + 0.05;
    let contrast = foregroundLuminance / backgroundLuminance;
    if (backgroundLuminance > foregroundLuminance) {
        contrast = 1 / contrast;
    }
    // round to two decimal places
    contrast = Math.floor(contrast * 100) / 100;
    return contrast;
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2ljLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUE2STs7QUFFN0k7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlFQUFlO0FBQ25DLG9CQUFvQixpRUFBZTtBQUNuQztBQUNBLGdCQUFnQixtRUFBaUI7QUFDakMsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix3REFBTTtBQUNoQztBQUNBLHlCQUF5Qix3REFBTTtBQUMvQix5QkFBeUIsbUVBQWlCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsQzs7Ozs7Ozs7Ozs7O0FDOUJEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPO0FBQ0E7QUFDQTs7QUFFQTtBQUNQO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDLFNBQVM7QUFDVDtBQUNBLGVBQWUsSUFBSTtBQUNuQjs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTyxpQkFBaUIsVUFBVTtBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NvZGUuanNcIik7XG4iLCJpbXBvcnQgeyBjb252ZXJ0UmdiVG9IZXgsIGdldENvbnRyYXN0U2NvcmVzLCBnZXRSR0IsIGNhbGN1bGF0ZUNvbnRyYXN0LCBmb3JlZ3JvdW5kQ29sb3IsIGZvcmVncm91bmRBbHBoYSwgYmFja2dvdW5kQ29sb3IgfSBmcm9tICcuL2xvZ2ljLmpzJztcblxuZmlnbWEuc2hvd1VJKF9faHRtbF9fKVxuXG5mdW5jdGlvbiBzZW5kQ29udHJhc3RJbmZvKGNvbnRyYXN0LCBmb3JlZ3JvdW5kLCBiYWNrZ291bmQpIHtcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgIHR5cGU6ICdzZWxlY3Rpb25DaGFuZ2UnLFxuICAgICAgICBmb3JlZ3JvdW5kOiBjb252ZXJ0UmdiVG9IZXgoZm9yZWdyb3VuZCksXG4gICAgICAgIGJhY2tncm91bmQ6IGNvbnZlcnRSZ2JUb0hleChiYWNrZ291bmQpLFxuICAgICAgICBjb250cmFzdCxcbiAgICAgICAgc2NvcmVzOiBnZXRDb250cmFzdFNjb3Jlcyhjb250cmFzdCksXG4gICAgfSlcbn1cblxuZmlnbWEub24oJ3NlbGVjdGlvbmNoYW5nZScsICgpID0+IHtcbiAgICBpZiAoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmZpbHRlcihcbiAgICAgICAgICAgIG5vZGUgPT4gbm9kZS5maWxscy5sZW5ndGggPiAwICYmIG5vZGUuZmlsbHNbMF0udHlwZSA9PT0gJ1NPTElEJ1xuICAgICAgICApXG4gICAgICAgIGNvbnN0IGZpbGxzID0gc2VsZWN0aW9uLm1hcChub2RlID0+IG5vZGUuZmlsbHNbMF0pXG4gICAgICAgIGZvcmVncm91bmRDb2xvciA9IGdldFJHQihmaWxsc1swXS5jb2xvcilcbiAgICAgICAgZm9yZWdyb3VuZEFscGhhID0gZmlsbHNbMF0ub3BhY2l0eVxuICAgICAgICBiYWNrZ291bmRDb2xvciA9IGdldFJHQihmaWxsc1sxXS5jb2xvcilcbiAgICAgICAgY29uc3QgY29udHJhc3QgPSBjYWxjdWxhdGVDb250cmFzdChcbiAgICAgICAgICAgIGZvcmVncm91bmRDb2xvcixcbiAgICAgICAgICAgIGZvcmVncm91bmRBbHBoYSxcbiAgICAgICAgICAgIGJhY2tnb3VuZENvbG9yLFxuICAgICAgICApXG4gICAgICAgIHNlbmRDb250cmFzdEluZm8oY29udHJhc3QsIGZvcmVncm91bmRDb2xvciwgYmFja2dvdW5kQ29sb3IpXG4gICAgfVxufSkiLCJleHBvcnQgdmFyIGZvcmVncm91bmRDb2xvclxuZXhwb3J0IHZhciBmb3JlZ3JvdW5kQWxwaGFcbmV4cG9ydCB2YXIgYmFja2dvdW5kQ29sb3JcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRSZ2JUb0hleChjb2xvcikge1xuICAgIGNvbnN0IGhleCA9IGNvbG9yXG4gICAgICAgIC5tYXAoKGNvbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGV4Q29sb3IgPSBjb2wudG9TdHJpbmcoMTYpO1xuICAgICAgICAgICAgcmV0dXJuIGAwJHtoZXhDb2xvcn1gLnNsaWNlKC0yKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmpvaW4oXCJcIik7XG4gICAgcmV0dXJuIGAjJHtoZXh9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUx1bWluYW5jZShjb2xvcikge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRDb2xvciA9IGNvbG9yLm1hcCgoY2hhbm5lbCkgPT4gY2hhbm5lbCAvIDI1NSk7XG4gICAgY29uc3QgZ2FtbWFDb3JyZWN0ZWRSR0IgPSBub3JtYWxpemVkQ29sb3IubWFwKChjaGFubmVsKSA9PlxuICAgICAgICBjaGFubmVsIDw9IDAuMDM5MjggP1xuICAgICAgICBjaGFubmVsIC8gMTIuOTIgOlxuICAgICAgICBNYXRoLnBvdygoY2hhbm5lbCArIDAuMDU1KSAvIDEuMDU1LCAyLjQpXG4gICAgKTtcbiAgICBjb25zdCBsdW1pbmFuY2UgPVxuICAgICAgICBnYW1tYUNvcnJlY3RlZFJHQlswXSAqIDAuMjEyNiArXG4gICAgICAgIGdhbW1hQ29ycmVjdGVkUkdCWzFdICogMC43MTUyICtcbiAgICAgICAgZ2FtbWFDb3JyZWN0ZWRSR0JbMl0gKiAwLjA3MjI7XG4gICAgcmV0dXJuIGx1bWluYW5jZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJHQih7IHIsIGcsIGIgfSkge1xuICAgIGNvbnN0IHJnYkNvbG9yQXJyYXkgPSBbciwgZywgYl0ubWFwKChjaGFubmVsKSA9PiBNYXRoLnJvdW5kKGNoYW5uZWwgKiAyNTUpKTtcbiAgICByZXR1cm4gcmdiQ29sb3JBcnJheTtcbn1cblxuZnVuY3Rpb24gb3ZlcmxheShmb3JlZ3JvdW5kLCBhbHBoYSwgYmFja2dvdW5kKSB7XG4gICAgaWYgKGFscGhhID49IDEpIHtcbiAgICAgICAgcmV0dXJuIGZvcmVncm91bmQ7XG4gICAgfVxuICAgIGNvbnN0IG92ZXJsYWlkID0gZm9yZWdyb3VuZC5tYXAoKGNoYW5uZWwsIGkpID0+XG4gICAgICAgIE1hdGgucm91bmQoY2hhbm5lbCAqIGFscGhhICsgYmFja2dvdW5kW2ldICogKDEgLSBhbHBoYSkpXG4gICAgKTtcbiAgICByZXR1cm4gb3ZlcmxhaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250cmFzdFNjb3Jlcyhjb250cmFzdCkge1xuICAgIGxldCBsYXJnZVRleHQ7XG4gICAgbGV0IG5vcm1hbFRleHQ7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIGNhc2UgY29udHJhc3QgPiA3OlxuICAgICAgICAgICAgbGFyZ2VUZXh0ID0gXCJBQUFcIjtcbiAgICAgICAgICAgIG5vcm1hbFRleHQgPSBcIkFBQVwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgY29udHJhc3QgPiA0LjU6XG4gICAgICAgICAgICBsYXJnZVRleHQgPSBcIkFBQVwiO1xuICAgICAgICAgICAgbm9ybWFsVGV4dCA9IFwiQUFcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGNvbnRyYXN0ID4gMzpcbiAgICAgICAgICAgIGxhcmdlVGV4dCA9IFwiQUFcIjtcbiAgICAgICAgICAgIG5vcm1hbFRleHQgPSBcIkZBSUxcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgbGFyZ2VUZXh0ID0gXCJGQUlMXCI7XG4gICAgICAgICAgICBub3JtYWxUZXh0ID0gXCJGQUlMXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHsgbGFyZ2VUZXh0LCBub3JtYWxUZXh0IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVDb250cmFzdChmb3JlZ3JvdW5kLCBhbHBoYSwgYmFja2dvdW5kKSB7XG4gICAgaWYgKGFscGhhIDwgMSkge1xuICAgICAgICBmb3JlZ3JvdW5kID0gb3ZlcmxheShmb3JlZ3JvdW5kLCBhbHBoYSwgYmFja2dvdW5kKTtcbiAgICB9XG4gICAgY29uc3QgZm9yZWdyb3VuZEx1bWluYW5jZSA9IGNhbGN1bGF0ZUx1bWluYW5jZShmb3JlZ3JvdW5kKSArIDAuMDU7XG4gICAgY29uc3QgYmFja2dyb3VuZEx1bWluYW5jZSA9IGNhbGN1bGF0ZUx1bWluYW5jZShiYWNrZ291bmQpICsgMC4wNTtcbiAgICBsZXQgY29udHJhc3QgPSBmb3JlZ3JvdW5kTHVtaW5hbmNlIC8gYmFja2dyb3VuZEx1bWluYW5jZTtcbiAgICBpZiAoYmFja2dyb3VuZEx1bWluYW5jZSA+IGZvcmVncm91bmRMdW1pbmFuY2UpIHtcbiAgICAgICAgY29udHJhc3QgPSAxIC8gY29udHJhc3Q7XG4gICAgfVxuICAgIC8vIHJvdW5kIHRvIHR3byBkZWNpbWFsIHBsYWNlc1xuICAgIGNvbnRyYXN0ID0gTWF0aC5mbG9vcihjb250cmFzdCAqIDEwMCkgLyAxMDA7XG4gICAgcmV0dXJuIGNvbnRyYXN0O1xufSJdLCJzb3VyY2VSb290IjoiIn0=