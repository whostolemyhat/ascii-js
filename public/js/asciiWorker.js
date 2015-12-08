console.log('worker script loaded');

function pixelToChar(pixel, mapLength) {
    const averageShade = Math.floor(pixel.r * 0.3 + pixel.b * 0.3 + pixel.g * 0.3);
    return Math.floor((255 - averageShade) * (mapLength / 256));
}

var charMap = [".", ",", ":", ";", "o", "x", "%", "#", "@"];

onmessage = function(e) {
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

    for(var i = 0; i < dataLength; i += PIXEL_LENGTH) {
        var pixel = {};
        pixel.r = data[i];
        pixel.g = data[i + 1];
        pixel.b = data[i + 2];
        pixel.a = data[i + 3];

        var char = charMap[ pixelToChar(pixel, charMap.length) ];
        out += char;

        if(i % imgWidth === 0 && i > 0) {
            out += '\r\n';
            postMessage({ type: 'progress', value: rowCount * rowPercent });
            rowCount++;
        }
    }

    // return out;
    postMessage({ type: 'result', value: out });

}