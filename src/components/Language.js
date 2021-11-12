import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
class Language extends Component {
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
        //Graphique
          
        return (
        <div className="languages">
            <div className="languages-container">
                <div className="languages-head">
                    <div className="title">Languages</div>
                    <div>
                        <div>{this.props.data.viewer.repositories.totalCount} repos</div>
                        <div>Last updated : {Updated}</div>
                    </div>
                </div>
                <div className="languages-info">
                    <div className="languages-info-info">
                    </div>
                </div>
            </div>     
        </div>
        );
    }
}

export default Language;