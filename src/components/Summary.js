import React, { Component } from 'react';

class Summary extends Component {
    render() {
        return (
            <div>
                {this.props.data.viewer?.login}
            </div>
        );
    }
}

export default Summary;