import React from 'react';
import UploadForm from 'UploadForm/UploadForm';
import Options from 'Options/Options';
import Progress from 'Progress/Progress';
import Result from 'Result/Result';

export default class AsciiApp extends React.Component {
    constructor() {
        super();

        // use to conditionally render components 
        this.state = {
            upload: true,
            progress: false,
            result: false
        };
    }

    render() {
        return (
            <div>
                <UploadForm>Drop an image here, or click to choose an image</UploadForm>
                <Progress />
                <Result />
            </div>
        );
    }
}