import React, { Component } from 'react';
import utils from '../utils/utils-service';

class stockTable extends Component {
    
    constructor (props) {
        super(props)
        this.minRows=6;
    }
    
    getPriceOfStock(stockId) {
        return '₹' + utils.toRupeeFormat(this.props.stockdata.getPriceOfStock(stockId));
    }

    checkMinShareLimit(shareCount) {
        return shareCount === 1;
    }

    checkMaxShareLimit(shareCount) {
        return shareCount === 19;
    }

    render() {

        let stockRows = this.props.portfolioStocks.map(stock => {
            let shareDetail = this.props.findInShareDetails(this.props.shareDetails, stock.stockId);
            return (<tr key={stock.stockId} className="scale-animation">
                <td> {stock.name} </td>
                <td> {this.getPriceOfStock(stock.stockId)} </td>
                <td> 
                    <div  className="share-ctrls">
                        <div className="neg-btn" disabled={this.checkMinShareLimit(shareDetail.shareCount)} onClick={this.props.updateStockCountHandler.bind(this, stock.stockId, -1)}> - </div> 
                        <span >{shareDetail.shareCount} </span>
                        <div className="pos-btn" disabled={this.checkMaxShareLimit(shareDetail.shareCount)} onClick={this.props.updateStockCountHandler.bind(this, stock.stockId, 1)}> + </div> 
                    </div>
                </td>
                <td> {utils.toFixedDecimal(stock.weight) + '%'} </td>
                <td> 
                    <div className="remove-button" onClick={this.props.updatePortfolioHandler.bind(this, stock.stockId)}>
                        <span> - </span>
                    </div> 
                </td>
            </tr>);
        });

        if (stockRows.length < this.minRows) {
            let rowsToAdd = this.minRows - stockRows.length;
            for (let i=0; i<rowsToAdd; i++) {
                stockRows.push(
                    <tr className="empty-row" key={"empty-row" + i}>
                         <td colSpan="5"></td>
                    </tr>
                );
            }
        }

        return  (
            <table className="portfolio-table-container">
                <thead>
                    <tr className="portfolio-table-header">
                        <th> STOCK </th>
                        <th> PRICE </th>
                        <th> SHARES </th>
                        <th> WEIGHT </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="portfolio-list">
                {stockRows} 
                </tbody>
            </table>
        );
    }
}


export default stockTable;