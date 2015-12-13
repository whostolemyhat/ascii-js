console.log('worker script loaded');

function getAverageShade(pixels) {
    let r = 0;
    let g = 0;
    let b = 0;

    let len = pixels.length;

    for(let i = 0; i < len; i++) {
        r += pixels[i].r * 0.3;
        g += pixels[i].g * 0.3;
        b += pixels[i].b * 0.3;
    }

    return Math.floor(r / len + b / len + g / len);
}

function getPixelData(row, i) {
    const pixel = {};
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
const charMap = [".", ",", ":", ";", "o", "x", "%", "#", "@"];

onmessage = function(e) {
    console.log('message received');
    console.log(e.data);

    const pixels = e.data[0];
    const options = e.data[1];

    const resolution = options.resolution || 1;
    const PIXEL_LENGTH = 4;

    const rowPercent = 100 / options.height;
    let rowCount = 0;
    const rows = pixels;
    let out = '';


    for(let y = 0; y < rows.length; y += resolution) {
        const row = rows[y];
        for(let i = 0; i < row.length; i += PIXEL_LENGTH * resolution) {
            const pixels = [];

            for(let j = 0; j < resolution; j += PIXEL_LENGTH) {
                pixels.push(getPixelData(row, i));
                pixels.push(getPixelData(row, i + j));
                pixels.push(getPixelData(rows[y + j], i));
                pixels.push(getPixelData(rows[y + j], i + j));
            }

            const averagePixel = getAverageShade(pixels);
            const char = charMap[ pixelToChar(averagePixel, charMap.length) ];
            out += char;
        }

        out += '\r\n';
        postMessage({ type: 'progress', value: rowCount * rowPercent * resolution });
        rowCount++;
    }

    // return out;
    postMessage({ type: 'result', value: out });

}