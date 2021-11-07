import React, { Component } from 'react';

class Summary extends Component {
    render() {
        const numberCommit = this.props
            .data
            .viewer
            ?.repositories
            .nodes
            .reduce((previous, current) => previous + current.ref === undefined ? 0 : current.ref.target.history.totalCount)

        const numberLine = ()=>{

        }
        return (
            <>
                <img src={this.props.data.viewer?.avatarUrl} alt="Avatar" />
                <div>{numberCommit}</div>
                <div>
                    followers: {this.props.data.viewer?.followers.totalCount}
                </div>
                <div>
                    following: {this.props.data.viewer?.following.totalCount}
                </div>
            </>
        );
    }
}

export default Summary;