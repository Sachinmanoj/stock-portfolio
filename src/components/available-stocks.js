import React, { Component } from 'react';
import utils from '../utils/utils-service';

class availableStocks extends Component {

    getPriceOfStock(stockId) {
        return utils.toRupeeFormat(this.props.stockdata.getPriceOfStock(stockId));
    }

    render() {
        let stocks = this.props.viewableStocks.map((stock) => {
            return (<li className="stock-inidividual-container" key={stock.stockId}>
                <div className="stock-inidividual-name"> 
                    {stock.name} 
                    <div  className="stock-inidividual-sector"> {stock.sector} </div>
                </div>
                <div className="stock-inidividual-price"> <span>₹</span> {this.getPriceOfStock(stock.stockId)} </div>
                <div className="stock-inidividual-add" onClick={this.props.updatePortfolioHandler.bind(this, stock.stockId)}></div>
            </li>);
        })
        return  (
            <ul className="stock-flex-container stock-available-container"> {stocks} </ul>
        );
    }
}

export default availableStocks;