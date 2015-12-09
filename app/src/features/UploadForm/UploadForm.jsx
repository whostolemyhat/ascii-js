import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import core from 'core';

export default class UploadForm extends React.Component {
    constructor(props) {
        super(props);

        // bind events - `this` in onClick is `e`
        this.onClick = this.onClick.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);

        this.state = {
            preview: null,
            dragEnter: false,
            allowedTypes: [
                'image/jpeg',
                'image/jpg',
                'image/png'
            ]
        };

        this.image = null;
    }

    // need to implement all the drag handlers otherwise the browser defaults take over
    onClick() {
        // use file upload
        const input = this.refs.input;
        input.value = null;
        input.click();
    }

    onDragEnter(e) {
        e.preventDefault();
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

        const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        console.log(files);

        // check only one
        let file = files[0];

        if(this.state.allowedTypes.indexOf(file.type) > -1) {
            this.setState({ preview: window.URL.createObjectURL(file) });
            
            const canvas = ReactDOM.findDOMNode(this.refs.photo);
            this.image = new Image();

            // note case!
            this.image.onload = () => { this.renderImage(canvas, this.image) };
            this.image.src =  window.URL.createObjectURL(file);
            core.setImage(this.image.src);
        }
    }

    renderImage(canvas, image) {
        // resize canvas to image
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);

        core.ascii.toAscii(context.getImageData(0, 0, canvas.height, canvas.width));
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
                onClick={ this.onClick }
                onDrop={ this.onDrop }
                onDragEnter={ this.onDragEnter }
                onDragOver={ this.onDragOver }
                onDragLeave={ this.onDragLeave }>

                { this.props.children }

                <input type="file" ref="input" onChange={ this.onDrop } />
                <canvas ref="photo"></canvas>
            </div>
        ); 
    };
}
