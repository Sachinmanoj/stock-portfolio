import React, { Component } from 'react';

class availableStocks extends Component {
    render() {
        let stocks = this.props.viewableStocks.map((stock) => {
            return (<li key={stock.stockId}>
                <div > {stock.name} </div>
                <a> {stock.sector} </a>
                <div> {this.props.stockdata.getPriceOfStock(stock.stockId)} </div>
                <div onClick={this.props.updatePortfolioHandler.bind(this, stock.stockId)}> add </div>
            </li>);
        })
        return  (
            <ul> {stocks} </ul>
        );
    }
}

export default availableStocks;