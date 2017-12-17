import React, { Component } from 'react';
import Pickstocks from './pick-stocks';
import Manageportfolio from './manage-portfolio';
import StockdataModel from '../model/stock-data-model';

class stockPortfolio extends Component {
    constructor (props) {
        super(props);
        this.state = {};
        this.state.stockInPortfolio = ["ALAN", "20ML", "III", "KMSS"];
        this.stockdataObj = new StockdataModel();
    }

    addStockToPortfolio(stockId) {
        this.setState(function(prevState, props) {
            let nextState = {};
            nextState.stockInPortfolio = prevState.stockInPortfolio.slice();
            nextState.stockInPortfolio.push(stockId);
            return nextState;
        });
    }
    
    removeStockFromPortfolio(stockId) {
        this.setState(function(prevState, props) {
            let nextState = {};
            let index = prevState.stockInPortfolio.indexOf(stockId);
            nextState.stockInPortfolio = prevState.stockInPortfolio.slice();
            nextState.stockInPortfolio.splice(index, 1);
            return nextState;
        });
    }

    render() {
        return ( 
            <div className="parent-layout-container">

                <div className="header-bar-spb"> </div>
                <div className="layout-container">
                    <h3 className="app-header">
                        smallcase Portfolio Builder 
                    </h3>

                    <Pickstocks
                    stockdata={this.stockdataObj} 
                    stockInPortfolio={this.state.stockInPortfolio} 
                    updatePortfolioHandler={this.addStockToPortfolio.bind(this)}/>

                    <Manageportfolio 
                    stockdata={this.stockdataObj} 
                    stockInPortfolio={this.state.stockInPortfolio} 
                    updatePortfolioHandler={this.removeStockFromPortfolio.bind(this)}/>
                </div>

            </div> 
        );
    }
}

export default stockPortfolio;