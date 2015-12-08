/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	console.log('worker script loaded');

	function pixelToChar(pixel, mapLength) {
	    var averageShade = Math.floor(pixel.r * 0.3 + pixel.b * 0.3 + pixel.g * 0.3);
	    return Math.floor((255 - averageShade) * (mapLength / 256));
	}

	var charMap = [".", ",", ":", ";", "o", "x", "%", "#", "@"];

	onmessage = function (e) {
	    console.log('message received');
	    console.log(e.data);
	    console.log('posting');

	    postMessage('hello');

	    var pixels = e.data[0];

	    var PIXEL_LENGTH = 4;
	    var imgWidth = pixels.width * PIXEL_LENGTH;
	    var rowPercent = 100 / pixels.height;
	    var rowCount = 0;
	    var data = pixels.data;
	    var dataLength = data.length;
	    var out = '';

	    for (var i = 0; i < dataLength; i += PIXEL_LENGTH) {
	        var pixel = {};
	        pixel.r = data[i];
	        pixel.g = data[i + 1];
	        pixel.b = data[i + 2];
	        pixel.a = data[i + 3];

	        var char = charMap[pixelToChar(pixel, charMap.length)];
	        out += char;

	        if (i % imgWidth === 0 && i > 0) {
	            out += '\r\n';
	            postMessage({ type: 'progress', value: rowCount * rowPercent });
	            rowCount++;
	        }
	    }

	    // return out;
	    postMessage({ type: 'result', value: out });
	};

/***/ }
/******/ ]);