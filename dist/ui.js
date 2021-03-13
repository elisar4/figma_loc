/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
window.onmessage = async event => {
    const message = event.data.pluginMessage
    const out = window.document.getElementById("out")
    out.textContent = message.debug
    console.log(message)
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qam9fbG9jYWxpemUvLi9zcmMvdWkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiJ1aS5qcyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5vbm1lc3NhZ2UgPSBhc3luYyBldmVudCA9PiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGV2ZW50LmRhdGEucGx1Z2luTWVzc2FnZVxuICAgIGNvbnN0IG91dCA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dFwiKVxuICAgIG91dC50ZXh0Q29udGVudCA9IG1lc3NhZ2UuZGVidWdcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKVxufSJdLCJzb3VyY2VSb290IjoiIn0=