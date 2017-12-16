import React, { Component } from 'react';
import Stocktable from './stock-table';
import Graphstockstatus from './graph-stock-status';
import Portfoliosummary from './port-folio-summary';
import '../css/manage-portfolio.css';

class managePortfolio extends Component {
    constructor (props) {
        super(props)
        this.state = {};
        this.data = {};
        this.data.portfolioStocks = this.getPortfolioStocks(this.props);
        this.state.shareDetails = this.getStockSharesDetails(this.data, this.state);         
    }

    findInShareDetails(shareDetails, stockId) {
        return (shareDetails && 
        shareDetails.find((share) => {
            return share.stockId === stockId;
        }));
    }

    updateShareWeights(data, props, state) {
        data.portfolioStocks.forEach((stock, index) => {
            stock.weight = ( props.stockdata.getPriceOfStock(stock.stockId) * 
            this.findInShareDetails(state.shareDetails, stock.stockId).shareCount ) / data.netWorth;
            stock.weight = stock.weight * 100;
        });
    }
    
    calculateNetWorth(data, props, state) {   
        return data.portfolioStocks.reduce((netValue, stock) => {
            return netValue + (props.stockdata.getPriceOfStock(stock.stockId) * 
            this.findInShareDetails(state.shareDetails, stock.stockId).shareCount);
        }, 0);
    }

    getStockSharesDetails(data, state) {
        var stockShares = data.portfolioStocks.map((stock) => {
            let shareDetail = this.findInShareDetails(state.shareDetails, stock.stockId);
            return shareDetail ? shareDetail :({
                'stockId': stock.stockId,
                'shareCount': 1
            })
        });
        return stockShares;
    }
    
    getPortfolioStocks(props) {
        let stockList = props.stockdata.getStockList();
        return  props.stockInPortfolio.map((stockId) => {
            return stockList.find(stock => {
                return stock.stockId === stockId;
            });
        }).reverse();
    }
    
    componentWillMount() {
        this.data.netWorth = this.calculateNetWorth(this.data, this.props, this.state);
        this.updateShareWeights(this.data, this.props, this.state);
    }

    componentWillReceiveProps(nextProps) {
        this.data.portfolioStocks = this.getPortfolioStocks(nextProps);
        this.setState((prevState) => {
            let nextState = {};
            nextState.shareDetails = this.getStockSharesDetails(this.data, prevState);
            return nextState;
        });
    }

    componentWillUpdate(nextProps, nextState) {   
        this.data.netWorth = this.calculateNetWorth(this.data, nextProps, nextState);
        this.updateShareWeights(this.data, nextProps, nextState);
    }

    updateStockCountHandler(stockId, counter) {
        this.setState((prevState) => {
            let nextState = {};
            nextState.shareDetails = prevState.shareDetails.slice();
            let shareDetail = this.findInShareDetails(nextState.shareDetails, stockId);
            shareDetail.shareCount = shareDetail.shareCount + counter;
            return nextState;
        });
    }


    render() {
        return  (
            <div  className="stock-inner-layout">
                <div className="stock-inner-header portfolio-stand">
                    <div className="content"> 
                        MANAGE PORTFOLIO
                    </div>
                </div>
                <div className="stock-inner-header-shade portfolio-stand"> </div>
                <div className="stock-flex-container stock-inner-holder portfolio-stand">
                    <Stocktable 
                    portfolioStocks={this.data.portfolioStocks} 
                    stockdata={this.props.stockdata} 
                    shareDetails = {this.state.shareDetails}
                    updateStockCountHandler = {this.updateStockCountHandler.bind(this)}
                    updatePortfolioHandler = {this.props.updatePortfolioHandler.bind(this)}
                    findInShareDetails = {this.findInShareDetails.bind(this)}
                    /> 
                    <Graphstockstatus 
                    portfolioStocks={this.data.portfolioStocks} 
                    stockdata={this.props.stockdata} 
                    shareDetails = {this.state.shareDetails}
                    findInShareDetails = {this.findInShareDetails.bind(this)}
                    />
                    <Portfoliosummary 
                    portfolioStocks={this.data.portfolioStocks} 
                    stockdata={this.props.stockdata} 
                    shareDetails = {this.state.shareDetails}
                    findInShareDetails = {this.findInShareDetails.bind(this)}
                    netWorth = {this.data.netWorth}
                    />
                </div>
            </div>
        );
    }
}

export default managePortfolio;