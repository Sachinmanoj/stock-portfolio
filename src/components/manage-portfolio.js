import React, { Component } from 'react';
import Stocktable from './stock-table';
import Graphstockstatus from './graph-stock-status';
import Portfoliosummary from './port-folio-summary';
import Buildportfolio from './build-portfolio';
import '../css/manage-portfolio.css';

class managePortfolio extends Component {
    render() {
        return  (
            <div>
                <Stocktable /> 
                <Graphstockstatus />
                <Portfoliosummary />
                <Buildportfolio />
            </div>
        );
    }
}

export default managePortfolio;