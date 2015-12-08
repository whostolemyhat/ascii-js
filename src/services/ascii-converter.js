import EventEmitter from 'eventemitter3';

export default class Ascii extends EventEmitter {
    constructor() {
        super();

        this.charMap = [".", ",", ":", ";", "o", "x", "%", "#", "@"];
    }

    pixelToChar(pixel, mapLength) {
        const averageShade = Math.floor(pixel.r * 0.3 + pixel.b * 0.3 + pixel.g * 0.3);
        return Math.floor((255 - averageShade) * (mapLength / 256));
    }

    toAscii(pixels) {
        console.log('toAscii', pixels);
        
        // data array is flattened rgba; ie each pixel is 4 elements in array
        const PIXEL_LENGTH = 4;
        const imgWidth = pixels.width * PIXEL_LENGTH;
        const rowPercent = 100 / pixels.height;
        let rowCount = 0;
        const data = pixels.data;
        const dataLength = data.length;
        let out = '';

        for(let i = 0; i < dataLength; i += PIXEL_LENGTH) {
            let pixel = {};
            pixel.r = data[i];
            pixel.g = data[i + 1];
            pixel.b = data[i + 2];
            pixel.a = data[i + 3];

            let char = this.charMap[ this.pixelToChar(pixel, this.charMap.length) ];
            out += char;

            if(i % imgWidth === 0 && i > 0) {
                out += '\r\n';
                this.emit('progress', rowCount * rowPercent);
                rowCount++;
            }
        }

        return out;
    }
}