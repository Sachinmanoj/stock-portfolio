import React, { Component } from 'react';

class portfolioSummary extends Component {
    
    calculateSumEarnings() {   
        return this.props.portfolioStocks.reduce((netValue, stock)=> {
            return netValue + (this.props.stockdata.getEpsOfStock(stock.stockId) * 
            this.props.findInShareDetails(this.props.shareDetails, stock.stockId).shareCount);
        }, 0);
    }
    
    calculatePERatio() {
        if(this.calculateSumEarnings() !== 0 ){
            return (this.props.netWorth / this.calculateSumEarnings());
        }
    }

    render() {
        return  (
            <div>
                <div> Stocks </div>
                <div> {this.props.portfolioStocks.length} </div>
                <div> Net Worth </div>                
                <div> {this.props.netWorth} </div>
                <div> P/E Ratio </div>
                <div> {this.calculatePERatio()} </div>
                <div> P/B Ratio </div>
                <div> {this.calculatePERatio()} </div>
            </div>
        );
    }
}

export default portfolioSummary;