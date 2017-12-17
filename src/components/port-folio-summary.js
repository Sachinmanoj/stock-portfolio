import React, { Component } from 'react';
import AnimationCount from 'react-count-animation';
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
        else {
            return 0;
        }
    }
    
    getNetWorth() {
        return '₹' + utils.toRupeeFormat(this.props.netWorth);
    }

    render() {
        
        let ratio = {};
        ratio.start = 0;
        ratio.count = this.calculatePERatio();
        ratio.duration = 1000;
        ratio.decimals = 2;
        ratio.useGroup = false;
        ratio.animation = 'up';
        
        return  (
            <div className="summary-container">
                <div className="group-row-summary">
                    <div className="individual-summary">
                        <div className="individual-summary-title"> Stocks </div>
                        <div className="individual-summary-value"> {this.props.portfolioStocks.length} </div>
                    </div>
                    <div className="individual-summary">
                        <div className="individual-summary-title"> Net Worth </div>
                        <div className="individual-summary-value"> {this.getNetWorth()} </div>
                    </div>
                    <div className="individual-summary">
                        <div className="individual-summary-title"> P/E Ratio </div>
                        <div className="individual-summary-value"> <AnimationCount {...ratio}/> </div>
                    </div>
                    <div className="individual-summary">
                        <div className="individual-summary-title"> P/B Ratio </div>
                        <div className="individual-summary-value"> <AnimationCount {...ratio}/> </div>
                    </div>
                </div>
                <div className="clear-fix"> </div>
                <div className="build-btn"> BUILD PORTFOLIO</div>
            </div>
        );
    }
}

export default portfolioSummary;