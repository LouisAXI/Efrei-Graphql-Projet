import React, { Component } from 'react';

class Summary extends Component {
    render() {
        const nodes = this.props.data.viewer.repositories.nodes;
        let numberCommit = 0;
        let numberLine = 0;
        const numberRepo = this.props.data.viewer.repositories.totalCount;
        
        nodes.forEach((node) => numberCommit += node.ref === null ? 0 : node.ref.target.history.totalCount);

        nodes.forEach((node) => numberLine += node.ref === null ? 0 : node.ref.target.additions - node.ref.target.deletions);

        return (
            <div className="summary-background">
                <div className="summary-container-box">
                    <div className="summary-container">
                        <div className="summary-profil">
                            <div className="summary-name title">{this.props.data.viewer?.login}</div>
                            <div className="summary-info">
                                <div className="summary-bio">{this.props.data.viewer?.bio}</div>
                                <div className="summary-location">{this.props.data.viewer?.location}</div>
                            </div>
                        </div>
                        <div className="summary-info-git">
                            <img src={this.props.data.viewer?.avatarUrl} alt="Avatar" />
                            <div className="summary-info-info">
                                <div className="summary-box">
                                    <div className="summary-box-name">
                                        Commits
                                    </div>
                                    <div className="summary-box-stats">
                                      {numberCommit}
                                    </div>
                                </div>
                                <div className="summary-box">
                                    <div className="summary-box-name">
                                        Repos
                                    </div>
                                    <div className="summary-box-stats">
                                        {numberRepo}
                                    </div> 
                                </div>
                                <div className="summary-box">
                                    <div className="summary-box-name">
                                        Lines of code
                                    </div>
                                    <div className="summary-box-stats">
                                        {numberLine}   
                                    </div> 
                                </div>
                                <div className="summary-box">
                                <div className="summary-box-name">
                                        Followers
                                    </div>
                                    <div className="summary-box-stats">
                                        {this.props.data.viewer?.followers.totalCount}
                                    </div> 
                                </div>
                                <div className="summary-box">
                                    <div className="summary-box-name">
                                        Following
                                    </div>
                                    <div className="summary-box-stats">
                                        {this.props.data.viewer?.following.totalCount}
                                    </div> 
                                </div>
                                <div className="summary-box">
                                    <div className="summary-box-name">
                                        Refresh
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Summary;