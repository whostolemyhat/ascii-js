import React from 'react';
import classnames from 'classnames';
import Ascii from 'ascii-converter';

// mostly nicked from https://github.com/paramaggarwal/react-dropzone/blob/master/index.js

export default class UploadForm extends React.Component {
    constructor(props) {
        super(props);

        // bind events - `this` in onClick is `e`
        // this.onClick = this.onClick.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);

        this.image;
        this.ascii = new Ascii();

        this.ascii.on('progress', this.updateProgress);

        this.state = {
            preview: null,
            dragEnter: false,
            allowedTypes: [
                'image/jpeg',
                'image/jpg',
                'image/png'
            ]
        };

        console.log(this);
    }

    // need to implement all the drag handlers otherwise the browser defaults take over
    onDragEnter(e) {
        e.preventDefault();
        console.log('enter');
        this.setState({ dragEnter: true });
    }

    onDragOver(e) {
        e.preventDefault();
    }

    onDragLeave(e) {
        e.preventDefault();
    }

    onDrop(e) {
        e.preventDefault();
        this.setState({ dragEnter: false });

        console.log('file dropped');
        const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        console.log(files);

        // check only one
        let file = files[0];

        // TODO: check file size and type
        if(this.state.allowedTypes.indexOf(file.type) > -1) {
            this.setState({ preview: window.URL.createObjectURL(file) });
            
            // TODO: kick off conversion
            const canvas = document.getElementById('photo');
            this.image = new Image();

            // note case!
            this.image.onload = () => { this.renderImage(canvas, this.image) };
            this.image.src =  window.URL.createObjectURL(file);
        }
    }

    updateProgress(percent) {
        console.log(`${ percent }%`);
    }

    renderImage(canvas, image) {
        console.log(image);
        // resize canvas to image
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        // console.log('data', context.getImageData(0, 0, canvas.height, canvas.width));
        document.getElementById('output').innerText = this.ascii.toAscii(context.getImageData(0, 0, canvas.height, canvas.width));
    }

    renderPreview() {
        if(this.state.preview) {
            return (
                <img className="preview" src={ this.state.preview } />
            );
        }
    }

    render() {
        const classes = classnames({
            'upload': true,
            'upload--drag-enter': this.state.dragEnter,
            'upload--has-file': this.state.preview
        });

        return (
            <div
                className={ classes }
                onDrop={ this.onDrop }
                onDragEnter={ this.onDragEnter }
                onDragOver={ this.onDragOver }
                onDragLeave={ this.onDragLeave }>

                { this.props.children }
                { this.renderPreview() }

                <input type="file"
                    ref="fileUpload"
                    onChange={ this.onDrop } />
            </div>
        ); 
    };
}
