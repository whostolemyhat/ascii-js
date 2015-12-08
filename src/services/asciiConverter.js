import EventEmitter from 'eventemitter3';

export default class AsciiConverter extends EventEmitter {
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

        const worker = new Worker('/js/asciiWorker.js');

        worker.postMessage([pixels]);
        worker.onmessage = e => {
            console.log('Message from worker');
            console.log(e);

            if(e.data.type === 'progress') {
                this.emit('progress', e.data.value);   
            }

            if(e.data.type === 'result') {
                this.emit('result', e.data.value);
            }
        }
        
        // data array is flattened rgba; ie each pixel is 4 elements in array
        // const PIXEL_LENGTH = 4;
        // const imgWidth = pixels.width * PIXEL_LENGTH;
        // const rowPercent = 100 / pixels.height;
        // let rowCount = 0;
        // const data = pixels.data;
        // const dataLength = data.length;
        // let out = '';

        // for(let i = 0; i < dataLength; i += PIXEL_LENGTH) {
        //     let pixel = {};
        //     pixel.r = data[i];
        //     pixel.g = data[i + 1];
        //     pixel.b = data[i + 2];
        //     pixel.a = data[i + 3];

        //     let char = this.charMap[ this.pixelToChar(pixel, this.charMap.length) ];
        //     out += char;

        //     if(i % imgWidth === 0 && i > 0) {
        //         out += '\r\n';
        //         this.emit('progress', rowCount * rowPercent);
        //         rowCount++;
        //     }
        // }

        // return out;
    }
}