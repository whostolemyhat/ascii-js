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

	function getAverageShade(pixels) {
	    var r = 0;
	    var g = 0;
	    var b = 0;

	    var len = pixels.length;

	    for (var i = 0; i < len; i++) {
	        r += pixels[i].r * 0.3;
	        g += pixels[i].g * 0.3;
	        b += pixels[i].b * 0.3;
	    }

	    return Math.floor(r / len + b / len + g / len);
	}

	function getPixelData(row, i) {
	    var pixel = {};
	    pixel.r = row[i];
	    pixel.g = row[i + 1];
	    pixel.b = row[i + 2];
	    pixel.a = row[i + 3];

	    return pixel;
	}

	function pixelToChar(pixel, mapLength) {
	    return Math.floor((255 - pixel) * (mapLength / 256));
	}

	// characters in order, representing light to dark
	var charMap = [".", ",", ":", ";", "o", "x", "%", "#", "@"];

	onmessage = function (e) {
	    console.log('message received');
	    console.log(e.data);

	    var pixels = e.data[0];
	    var options = e.data[1];

	    var resolution = options.resolution || 1;
	    var PIXEL_LENGTH = 4;

	    var rowPercent = 100 / options.height;
	    var rowCount = 0;
	    var rows = pixels;
	    var out = '';

	    for (var y = 0; y < rows.length; y += resolution) {
	        var row = rows[y];
	        for (var i = 0; i < row.length; i += PIXEL_LENGTH * resolution) {
	            var _pixels = [];

	            for (var j = 0; j < resolution; j += PIXEL_LENGTH) {
	                _pixels.push(getPixelData(row, i));
	                _pixels.push(getPixelData(row, i + j));
	                _pixels.push(getPixelData(rows[y + j], i));
	                _pixels.push(getPixelData(rows[y + j], i + j));
	            }

	            var averagePixel = getAverageShade(_pixels);
	            var char = charMap[pixelToChar(averagePixel, charMap.length)];
	            out += char;
	        }

	        out += '\r\n';
	        postMessage({ type: 'progress', value: rowCount * rowPercent * resolution });
	        rowCount++;
	    }

	    // return out;
	    postMessage({ type: 'result', value: out });
	};

/***/ }
/******/ ]);