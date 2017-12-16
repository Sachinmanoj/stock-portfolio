import React, { Component } from 'react';
import utils from '../utils/utils-service';

class portfolioSummary extends Component {
    
    calculateSumEarnings() {   
        return this.props.portfolioStocks.reduce((netValue, stock)=> {
            return netValue + (this.props.stockdata.getEpsOfStock(stock.stockId) * 
            this.props.findInShareDetails(this.props.shareDetails, stock.stockId).shareCount);
        }, 0);
    }
    
    calculatePERatio() {
        if(this.calculateSumEarnings() !== 0 ){
            return utils.toFixedDecimal((this.props.netWorth / this.calculateSumEarnings()));
        }
    }
    
    getNetWorth() {
        return '₹' + utils.toRupeeFormat(this.props.netWorth);
    }

    render() {
        return  (
            <div className="summary-container">
                <div className="group-row-summary">
                    <div className="individual-summary">
                        <div className="individual-summary-title"> Stocks </div>
                        <div className="individual-summary-value"> {this.props.portfolioStocks.length} </div>
                    </div>
                    <div className="individual-summary">
                        <div className="individual-summary-title"> Net Worth </div>
                        <div className="individual-summary-value"> { this.getNetWorth()} </div>
                    </div>
                    <div className="individual-summary">
                        <div className="individual-summary-title"> P/E Ratio </div>
                        <div className="individual-summary-value"> {this.calculatePERatio()} </div>
                    </div>
                    <div className="individual-summary">
                        <div className="individual-summary-title"> P/B Ratio </div>
                        <div className="individual-summary-value"> {this.calculatePERatio()} </div>
                    </div>
                </div>
                <div className="clear-fix"> </div>
                <div className="build-btn"> BUILD PORTFOLIO</div>
            </div>
        );
    }
}

export default portfolioSummary;