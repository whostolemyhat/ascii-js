import React from 'react';
import core from 'core';

export default class Progress extends React.Component {
    constructor() {
        super();

        this.state = {
            progress: 0,
            img: null
        };

        // TODO: hmm
        core.ascii.on('progress', this.updateProgress.bind(this));
        core.on('imageChanged', this.updateImg.bind(this));
    }

    updateImg(src) {
        this.setState({ img: src });
        renderPreview();
    }

    renderPreview() {
        if(this.state.img) {
            return (
                <img className="preview" src={ this.state.img } />
            );
        }
    }

    updateProgress(progress) {
        console.log(`${ progress }%`);
        this.setState({ progress: progress });
    }

    render() {
        return (
            <div>
                { this.renderPreview() }
                <progress value={ this.state.progress } max="100" />
            </div>
        );
    };
}