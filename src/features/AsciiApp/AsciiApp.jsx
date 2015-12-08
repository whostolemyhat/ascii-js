import React from 'react';
import UploadForm from 'UploadForm/UploadForm';
import Progress from 'Progress/Progress';
import Result from 'Result/Result';

export default class AsciiApp extends React.Component {

    render() {
        return (
            <main role="main">
                <UploadForm>Drop an image here</UploadForm>
                <Progress />
                <Result />
            </main>
        );
    }
}