import React, { Component } from 'react';

class Repositories extends Component {
    render() {
        const nodes = this.props.data.viewer.repositories.nodes;

        //Chercher le dernier commits et le mettre en bon format
        let lastUpdate = '';
        for(const node of nodes){
            for(const edge of node.ref === null ? [] : node.ref.target.history.edges){
                if (lastUpdate < edge.node.committedDate)
                    lastUpdate = edge.node.committedDate
            }
        }
        const Updated = new Date(lastUpdate).toUTCString();
        
        return (
            <div className="repositories">
            <div className="repositories-container">
                <div className="repositories-head">
                    <div className="title">Repositories</div>
                    <div>
                        <div>{this.props.data.viewer.repositories.totalCount} repos</div>
                        <div>Last updated : {Updated}</div>
                    </div>
                </div>
            </div>     
        </div>
        );
    }
}

export default Repositories;