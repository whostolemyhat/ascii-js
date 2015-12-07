const charMap = [".", ",", ":", ";", "o", "x", "%", "#", "@"];

function pixelToChar(pixel, mapLength) {
    const averageShade = Math.floor(pixel.r * 0.3 + pixel.b * 0.3 + pixel.g * 0.3);
    return Math.floor((255 - averageShade) * (mapLength / 256));
}


export default function toAscii(pixels) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
    // context = canvas instance with image loaded
    console.log('toAscii', pixels);
    // data array is flattened rgba; ie each pixel is 4 elements in array
    const PIXEL_LENGTH = 4;
    const imgWidth = pixels.width * PIXEL_LENGTH;
    const data = pixels.data;
    const dataLength = data.length;
    let out = '';

    for(let i = 0; i < dataLength; i += PIXEL_LENGTH) {
        let pixel = {};
        pixel.r = data[i];
        pixel.g = data[i + 1];
        pixel.b = data[i + 2];
        pixel.a = data[i + 3];

        let char = charMap[pixelToChar(pixel, charMap.length)];
        out += char;
        if(i % imgWidth === 0) {
            out += '\r\n';
        }
    }

    return out;
}