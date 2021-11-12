import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';

class Overview extends Component {
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

        //Ajouter dans l'array, tout les langages et le nombre d'apparition
        let languages = {};
        for (const node of nodes) {
            for (const lNode of node.languages.nodes) {
                const n = languages[lNode.name];
                languages = {
                    ...languages,
                    [lNode.name]: n ? (n + 1) : 1,
                }   
            }
        }
        let sLanguages = JSON.stringify(languages);

        //Graphique
        const data = {
            labels: [Object.keys(languages)[0], Object.keys(languages)[1], Object.keys(languages)[2],
            Object.keys(languages)[3],Object.keys(languages)[4],Object.keys(languages)[5],
            Object.keys(languages)[6],Object.keys(languages)[7]],
            datasets: [
              {
                label: '# of Votes',
                data: [Object.values(languages)[0], Object.values(languages)[1], Object.values(languages)[2],
                Object.values(languages)[3],Object.values(languages)[4],Object.values(languages)[5],
                Object.values(languages)[6],Object.values(languages)[7]],
                backgroundColor: [
                  'rgba(102, 0, 153, 0.5)',
                  'rgba(176, 242, 182, 0.5)',
                  'rgba(0, 142, 142, 0.5)',
                  'rgba(141, 64, 36, 0.5)',
                  'rgba(27, 1, 155, 0.5)',
                  'rgba(233, 201, 177, 0.5)',
                  'rgba(255, 255, 107, 0.5)',
                  'rgba(133, 109, 77, 0.5)',
                ],
                borderColor: [
                    'rgba(102, 0, 153, 0.5)',
                    'rgba(176, 242, 182, 0.5)',
                    'rgba(0, 142, 142, 0.5)',
                    'rgba(141, 64, 36, 0.5)',
                    'rgba(27, 1, 155, 0.5)',
                    'rgba(233, 201, 177, 0.5)',
                    'rgba(255, 255, 107, 0.5)',
                    'rgba(133, 109, 77, 0.5)',
                ],
                borderWidth: 1,
              },
            ],
          };

        //console.log(Object.keys(languages)[0])

        return (
            <div className="overview">
                <div className="overview-container">
                    <div className="overview-head">
                        <div className="title">Overview</div>
                        <div>
                            <div>{this.props.data.viewer.repositories.totalCount} repos</div>
                            <div>Last updated : {Updated}</div>
                        </div>
                    </div>
                    
                    <Pie data={data}/>
                </div>     
            </div>
        );
    }
}

export default Overview;