import React, { Component } from 'react';
import Pickstocks from './pick-stocks';
import Manageportfolio from './manage-portfolio';
import StockdataModel from '../model/stock-data-model';
import '../css/stock-portfolio-builder.css';

class stockPortfolio extends Component {
    constructor (props) {
        super(props);
        this.state = {};
        this.state.stockInPortfolio = [];
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
            <div>

                <div className="app-header">
                    smallcase Portfolio Builder 
                </div>

                <Pickstocks 
                stockdata={this.stockdataObj} 
                stockInPortfolio={this.state.stockInPortfolio} 
                updatePortfolioHandler={this.addStockToPortfolio.bind(this)}/>

                <Manageportfolio 
                stockdata={this.stockdataObj} 
                stockInPortfolio={this.state.stockInPortfolio} 
                updatePortfolioHandler={this.removeStockFromPortfolio.bind(this)}/>

            </div> 
        );
    }
}

export default stockPortfolio;