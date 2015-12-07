import React from 'react';

// mostly nicked from https://github.com/paramaggarwal/react-dropzone/blob/master/index.js

export default class UploadForm extends React.Component {
    // need to implement all the drag handlers otherwise the browser defaults take over
    onDragEnter(e) {
        e.preventDefault();
        console.log('enter');
    }

    onDragOver(e) {
        e.preventDefault();
    }

    onDragLeave(e) {
        e.preventDefault();
    }

    onDrop(e) {
        e.preventDefault();

        console.log('file dropped');
        const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        console.log(files);
        // TODO: check file size and type
        // TODO: check only one
        // TODO: kick off conversion
        // test
    }

    render() {
        return (
            <div
                style={{ border: "1px solid black" }}
                onDrop={ this.onDrop }
                onDragEnter={ this.onDragEnter }
                onDragOver={ this.onDragOver }
                onDragLeave={ this.onDragLeave }>

                { this.props.children }

                <input type="file"
                    ref="fileUpload"
                    onChange={ this.onDrop } />
            </div>
        ); 
    };
}
