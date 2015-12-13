import React from 'react';

export default class Options extends React.Component {
    constructor() {
        super();

        this.state = {
            resolution: 3
        };
    }
    
    render() {
        <input type="text" value={ this.state.resolution } />
    }
}