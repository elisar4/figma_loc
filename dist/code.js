/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertRgbToHex": () => (/* binding */ convertRgbToHex),
/* harmony export */   "calculateLuminance": () => (/* binding */ calculateLuminance),
/* harmony export */   "getRGB": () => (/* binding */ getRGB),
/* harmony export */   "getContrastScores": () => (/* binding */ getContrastScores),
/* harmony export */   "calculateContrast": () => (/* binding */ calculateContrast)
/* harmony export */ });
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

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/code.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic.js */ "./src/logic.js");


figma.showUI(__html__)

function sendContrastInfo(contrast, foreground, backgound) {
    figma.ui.postMessage({
        type: 'selectionChange',
        foreground: (0,_logic_js__WEBPACK_IMPORTED_MODULE_0__.convertRgbToHex)(foreground),
        background: (0,_logic_js__WEBPACK_IMPORTED_MODULE_0__.convertRgbToHex)(backgound),
        contrast,
        scores: (0,_logic_js__WEBPACK_IMPORTED_MODULE_0__.getContrastScores)(contrast),
    })
}

figma.on('selectionchange', () => {
    if (figma.currentPage.selection.length > 1) {
        const selection = figma.currentPage.selection.filter(
            node => node.fills.length > 0 && node.fills[0].type === 'SOLID'
        )
        const fills = selection.map(node => node.fills[0])
        foregroundColor = (0,_logic_js__WEBPACK_IMPORTED_MODULE_0__.getRGB)(fills[0].color)
        foregroundAlpha = fills[0].opacity
        backgoundColor = (0,_logic_js__WEBPACK_IMPORTED_MODULE_0__.getRGB)(fills[1].color)
        const contrast = (0,_logic_js__WEBPACK_IMPORTED_MODULE_0__.calculateContrast)(
            foregroundColor,
            foregroundAlpha,
            backgoundColor,
        )
        sendContrastInfo(contrast, foregroundColor, backgoundColor)
    }
})
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qam9fbG9jYWxpemUvLi9zcmMvbG9naWMuanMiLCJ3ZWJwYWNrOi8vampvX2xvY2FsaXplL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2pqb19sb2NhbGl6ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vampvX2xvY2FsaXplL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vampvX2xvY2FsaXplL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vampvX2xvY2FsaXplLy4vc3JjL2NvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQyxTQUFTO0FBQ1Q7QUFDQSxlQUFlLElBQUk7QUFDbkI7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU8saUJBQWlCLFVBQVU7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7VUM1RUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7QUNOMkY7O0FBRTNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwREFBZTtBQUNuQyxvQkFBb0IsMERBQWU7QUFDbkM7QUFDQSxnQkFBZ0IsNERBQWlCO0FBQ2pDLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsaURBQU07QUFDaEM7QUFDQSx5QkFBeUIsaURBQU07QUFDL0IseUJBQXlCLDREQUFpQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEMiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0UmdiVG9IZXgoY29sb3IpIHtcbiAgICBjb25zdCBoZXggPSBjb2xvclxuICAgICAgICAubWFwKChjb2wpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhleENvbG9yID0gY29sLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgIHJldHVybiBgMCR7aGV4Q29sb3J9YC5zbGljZSgtMik7XG4gICAgICAgIH0pXG4gICAgICAgIC5qb2luKFwiXCIpO1xuICAgIHJldHVybiBgIyR7aGV4fWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVMdW1pbmFuY2UoY29sb3IpIHtcbiAgICBjb25zdCBub3JtYWxpemVkQ29sb3IgPSBjb2xvci5tYXAoKGNoYW5uZWwpID0+IGNoYW5uZWwgLyAyNTUpO1xuICAgIGNvbnN0IGdhbW1hQ29ycmVjdGVkUkdCID0gbm9ybWFsaXplZENvbG9yLm1hcCgoY2hhbm5lbCkgPT5cbiAgICAgICAgY2hhbm5lbCA8PSAwLjAzOTI4ID9cbiAgICAgICAgY2hhbm5lbCAvIDEyLjkyIDpcbiAgICAgICAgTWF0aC5wb3coKGNoYW5uZWwgKyAwLjA1NSkgLyAxLjA1NSwgMi40KVxuICAgICk7XG4gICAgY29uc3QgbHVtaW5hbmNlID1cbiAgICAgICAgZ2FtbWFDb3JyZWN0ZWRSR0JbMF0gKiAwLjIxMjYgK1xuICAgICAgICBnYW1tYUNvcnJlY3RlZFJHQlsxXSAqIDAuNzE1MiArXG4gICAgICAgIGdhbW1hQ29ycmVjdGVkUkdCWzJdICogMC4wNzIyO1xuICAgIHJldHVybiBsdW1pbmFuY2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSR0IoeyByLCBnLCBiIH0pIHtcbiAgICBjb25zdCByZ2JDb2xvckFycmF5ID0gW3IsIGcsIGJdLm1hcCgoY2hhbm5lbCkgPT4gTWF0aC5yb3VuZChjaGFubmVsICogMjU1KSk7XG4gICAgcmV0dXJuIHJnYkNvbG9yQXJyYXk7XG59XG5cbmZ1bmN0aW9uIG92ZXJsYXkoZm9yZWdyb3VuZCwgYWxwaGEsIGJhY2tnb3VuZCkge1xuICAgIGlmIChhbHBoYSA+PSAxKSB7XG4gICAgICAgIHJldHVybiBmb3JlZ3JvdW5kO1xuICAgIH1cbiAgICBjb25zdCBvdmVybGFpZCA9IGZvcmVncm91bmQubWFwKChjaGFubmVsLCBpKSA9PlxuICAgICAgICBNYXRoLnJvdW5kKGNoYW5uZWwgKiBhbHBoYSArIGJhY2tnb3VuZFtpXSAqICgxIC0gYWxwaGEpKVxuICAgICk7XG4gICAgcmV0dXJuIG92ZXJsYWlkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udHJhc3RTY29yZXMoY29udHJhc3QpIHtcbiAgICBsZXQgbGFyZ2VUZXh0O1xuICAgIGxldCBub3JtYWxUZXh0O1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICBjYXNlIGNvbnRyYXN0ID4gNzpcbiAgICAgICAgICAgIGxhcmdlVGV4dCA9IFwiQUFBXCI7XG4gICAgICAgICAgICBub3JtYWxUZXh0ID0gXCJBQUFcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGNvbnRyYXN0ID4gNC41OlxuICAgICAgICAgICAgbGFyZ2VUZXh0ID0gXCJBQUFcIjtcbiAgICAgICAgICAgIG5vcm1hbFRleHQgPSBcIkFBXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBjb250cmFzdCA+IDM6XG4gICAgICAgICAgICBsYXJnZVRleHQgPSBcIkFBXCI7XG4gICAgICAgICAgICBub3JtYWxUZXh0ID0gXCJGQUlMXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGxhcmdlVGV4dCA9IFwiRkFJTFwiO1xuICAgICAgICAgICAgbm9ybWFsVGV4dCA9IFwiRkFJTFwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiB7IGxhcmdlVGV4dCwgbm9ybWFsVGV4dCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlQ29udHJhc3QoZm9yZWdyb3VuZCwgYWxwaGEsIGJhY2tnb3VuZCkge1xuICAgIGlmIChhbHBoYSA8IDEpIHtcbiAgICAgICAgZm9yZWdyb3VuZCA9IG92ZXJsYXkoZm9yZWdyb3VuZCwgYWxwaGEsIGJhY2tnb3VuZCk7XG4gICAgfVxuICAgIGNvbnN0IGZvcmVncm91bmRMdW1pbmFuY2UgPSBjYWxjdWxhdGVMdW1pbmFuY2UoZm9yZWdyb3VuZCkgKyAwLjA1O1xuICAgIGNvbnN0IGJhY2tncm91bmRMdW1pbmFuY2UgPSBjYWxjdWxhdGVMdW1pbmFuY2UoYmFja2dvdW5kKSArIDAuMDU7XG4gICAgbGV0IGNvbnRyYXN0ID0gZm9yZWdyb3VuZEx1bWluYW5jZSAvIGJhY2tncm91bmRMdW1pbmFuY2U7XG4gICAgaWYgKGJhY2tncm91bmRMdW1pbmFuY2UgPiBmb3JlZ3JvdW5kTHVtaW5hbmNlKSB7XG4gICAgICAgIGNvbnRyYXN0ID0gMSAvIGNvbnRyYXN0O1xuICAgIH1cbiAgICAvLyByb3VuZCB0byB0d28gZGVjaW1hbCBwbGFjZXNcbiAgICBjb250cmFzdCA9IE1hdGguZmxvb3IoY29udHJhc3QgKiAxMDApIC8gMTAwO1xuICAgIHJldHVybiBjb250cmFzdDtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNvbnZlcnRSZ2JUb0hleCwgZ2V0Q29udHJhc3RTY29yZXMsIGdldFJHQiwgY2FsY3VsYXRlQ29udHJhc3QgfSBmcm9tICcuL2xvZ2ljLmpzJztcblxuZmlnbWEuc2hvd1VJKF9faHRtbF9fKVxuXG5mdW5jdGlvbiBzZW5kQ29udHJhc3RJbmZvKGNvbnRyYXN0LCBmb3JlZ3JvdW5kLCBiYWNrZ291bmQpIHtcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgIHR5cGU6ICdzZWxlY3Rpb25DaGFuZ2UnLFxuICAgICAgICBmb3JlZ3JvdW5kOiBjb252ZXJ0UmdiVG9IZXgoZm9yZWdyb3VuZCksXG4gICAgICAgIGJhY2tncm91bmQ6IGNvbnZlcnRSZ2JUb0hleChiYWNrZ291bmQpLFxuICAgICAgICBjb250cmFzdCxcbiAgICAgICAgc2NvcmVzOiBnZXRDb250cmFzdFNjb3Jlcyhjb250cmFzdCksXG4gICAgfSlcbn1cblxuZmlnbWEub24oJ3NlbGVjdGlvbmNoYW5nZScsICgpID0+IHtcbiAgICBpZiAoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmZpbHRlcihcbiAgICAgICAgICAgIG5vZGUgPT4gbm9kZS5maWxscy5sZW5ndGggPiAwICYmIG5vZGUuZmlsbHNbMF0udHlwZSA9PT0gJ1NPTElEJ1xuICAgICAgICApXG4gICAgICAgIGNvbnN0IGZpbGxzID0gc2VsZWN0aW9uLm1hcChub2RlID0+IG5vZGUuZmlsbHNbMF0pXG4gICAgICAgIGZvcmVncm91bmRDb2xvciA9IGdldFJHQihmaWxsc1swXS5jb2xvcilcbiAgICAgICAgZm9yZWdyb3VuZEFscGhhID0gZmlsbHNbMF0ub3BhY2l0eVxuICAgICAgICBiYWNrZ291bmRDb2xvciA9IGdldFJHQihmaWxsc1sxXS5jb2xvcilcbiAgICAgICAgY29uc3QgY29udHJhc3QgPSBjYWxjdWxhdGVDb250cmFzdChcbiAgICAgICAgICAgIGZvcmVncm91bmRDb2xvcixcbiAgICAgICAgICAgIGZvcmVncm91bmRBbHBoYSxcbiAgICAgICAgICAgIGJhY2tnb3VuZENvbG9yLFxuICAgICAgICApXG4gICAgICAgIHNlbmRDb250cmFzdEluZm8oY29udHJhc3QsIGZvcmVncm91bmRDb2xvciwgYmFja2dvdW5kQ29sb3IpXG4gICAgfVxufSkiXSwic291cmNlUm9vdCI6IiJ9