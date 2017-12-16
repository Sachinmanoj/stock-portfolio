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
        this.state = {};
        this.state.page = 1;
        this.data = {};
        this.data.viewableStocks = this.getViewableStocklist(this.props, this.state);
        this.data.minStockinView = this.getMinStockinView(this.state);
        this.data.maxStockinView = this.getMaxStockinView(this.state);
    }

    getPrevPageStockLength(state) {
        return ((state.page - 1) * this.appdataObj.getMaxStockTileInView());
    }

    getMinStockinView(state) {
        return  this.getPrevPageStockLength(state) + 1;
    }

    getMaxStockinView(state) {
        return this.getMinStockinView(state) + this.data.viewableStocks.length - 1;
    }

    pageSwitchHandler(counter) {
        this.setState(function (prevState, props) {
            let nextState = {};
            nextState.page = prevState.page + counter;
            return nextState;
        }); 
    }

    getAvailableStocks(props) {
        return  props.stockdata.getStockList().filter((stock)=> {
            return (props.stockInPortfolio.indexOf(stock.stockId) === -1);
        });
    }

    getViewableStocklist(props, state) {
        let stocks = this.getAvailableStocks(props);  
        var min = this.getPrevPageStockLength(state);
        var max = min + this.appdataObj.getMaxStockTileInView();
        return stocks.slice(min, max);
    }

    componentWillUpdate(nextProps, nextState) {
        this.data.viewableStocks = this.getViewableStocklist(nextProps, nextState);
        this.data.minStockinView = this.getMinStockinView(nextState);
        this.data.maxStockinView = this.getMaxStockinView(nextState);
    }

    disablePrev() {
        return this.state.page === 1;
    }

    disableNext() {
        return this.data.maxStockinView === this.getAvailableStocks(this.props).length;
    }

    render() {
        return  (
            <div  className="stock-inner-layout">
                <div className="stock-inner-header pick-stock-stand">
                    <div className="content"> 
                        PICK STOCKS
                    </div>
                </div>
                <div className="stock-inner-header-shade pick-stock-stand"> </div>
                <div className="stock-inner-holder">
                    <div className="stock-details-ctrls">
                        <div className="stock-list-details">Showing {this.data.minStockinView} - {this.data.maxStockinView} of {this.getAvailableStocks(this.props).length} matching stocks</div>
                    </div>
                    <div className="clear-fix"> </div>
                    <Availablestocks 
                        stockdata={this.props.stockdata} 
                        viewableStocks={this.data.viewableStocks} 
                        updatePortfolioHandler={this.props.updatePortfolioHandler.bind(this)} />
                    <div className="stock-details-ctrls"> 
                        <div className="stock-details-prev-btn">
                            <PickStocknav counter={-1} text="PREV" disableOn={this.disablePrev()} countUpdateHandler={this.pageSwitchHandler.bind(this)} />
                        </div>
                        <div className="stock-details-next-btn"> 
                            <PickStocknav className="stock-details-next-btn" counter={1} text="NEXT" disableOn={this.disableNext()}  countUpdateHandler={this.pageSwitchHandler.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default pickStocks;