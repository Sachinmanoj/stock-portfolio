import React, { Component } from 'react';

class availableStocks extends Component {
    render() {
        let stocks = this.props.viewableStocks.map((stock) => {
            return (<li className="stock-inidividual-container" key={stock.stockId}>
                <div className="stock-inidividual-name"> 
                    {stock.name} 
                    <div  className="stock-inidividual-sector"> {stock.sector} </div>
                </div>
                <div className="stock-inidividual-price"> <span>₹</span> {this.props.stockdata.getPriceOfStock(stock.stockId)} </div>
                {/* <div onClick={this.props.updatePortfolioHandler.bind(this, stock.stockId)}> + </div> */}
            </li>);
        })
        return  (
            <ul className="stock-flex-container stock-available-container"> {stocks} </ul>
        );
    }
}

export default availableStocks;