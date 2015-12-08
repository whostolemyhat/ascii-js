import React from 'react';
import core from 'core';

export default class Progress extends React.Component {
    constructor() {
        super();

        this.state = {
            progress: 0
        };

        core.ascii.on('progress', this.updateProgress.bind(this));
        core.ascii.on('result', this.showResult.bind(this));
    }


    updateProgress(progress) {
        console.log(`${ progress }%`);
        this.setState({ progress: progress });
    }

    showResult(result) {
        document.getElementById('output').innerText = result;
    }

    render() {
        console.log('rendering progress');
        return (
            <div>
                <img />
                <progress value={ this.state.progress } max="100" />
                Progress
            </div>
        );
    };
}