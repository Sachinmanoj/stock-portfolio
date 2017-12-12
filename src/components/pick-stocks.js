import React, { Component } from 'react';
import Applyfilter from './apply-filter';
import Availablestocks from './available-stocks';
import PickStocknav from './pick-stocknav';
import AppdataModel from '../model/app-data-model';
import '../css/pick-stocks.css';

class pickStocks extends Component {
    constructor (props) {
        super(props);        
        this.appdataObj = new AppdataModel();
        this.viewableStocks = this.getViewableStocklist();
    }

    getViewableStocklist(stockInPortfolio) {
        let stocks = this.getAvailableStocks(stockInPortfolio);
        var min = this.getMinStockinView();
        var max = this.getMaxStockinView();
        return stocks.slice(min, max);
    }

    getAvailableStocks(stockInPortfolio) {
        stockInPortfolio = stockInPortfolio ? stockInPortfolio : this.props.stockInPortfolio;
        return  this.props.stockdata.getStockList().filter((stock)=> {
            return (stockInPortfolio.indexOf(stock.stockId) === -1);
        });
    }

    componentWillUpdate(nextProps, nextState) {
        console.log(nextProps.stockInPortfolio);
        this.viewableStocks = this.getViewableStocklist(nextProps.stockInPortfolio);
    }

    getMinStockinView() {
        return 1;
    }

    getMaxStockinView() {
        return this.appdataObj.getMaxStockTileInView();
    }

    render() {
        return  (
            <div>
                <div>PICK STOCKS</div>
                <div>Showing {this.getMinStockinView()} - {this.getMaxStockinView()} of {this.getAvailableStocks().length} matching stocks</div>
                <Availablestocks stockdata={this.props.stockdata} viewableStocks={this.viewableStocks} updatePortfolioHandler={this.props.updatePortfolioHandler.bind(this)} />
            </div>
        );
    }
}

export default pickStocks;