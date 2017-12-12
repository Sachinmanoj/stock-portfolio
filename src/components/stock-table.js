import React, { Component } from 'react';

class stockTable extends Component {
      
    render() {
        let stockRows = this.props.portfolioStocks.map(stock => {
            let shareDetail = this.props.findInShareDetails(this.props.shareDetails, stock.stockId);
            return (<tr key={stock.stockId}>
                <td> {stock.name} </td>
                <td> {this.props.stockdata.getPriceOfStock(stock.stockId)} </td>
                <td> 
                    <button onClick={this.props.updateStockCountHandler.bind(this, stock.stockId, -1)}> - </button> 
                    {shareDetail.shareCount}
                    <button onClick={this.props.updateStockCountHandler.bind(this, stock.stockId, 1)}> + </button> 
                </td>
                <td> {stock.weight} </td>
                <td> 
                    <button onClick={this.props.updatePortfolioHandler.bind(this, stock.stockId)}> - </button> 
                </td>
            </tr>);
        });
        return  (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th> STOCK </th>
                            <th> PRICE </th>
                            <th> SHARES </th>
                            <th> WEIGHT </th>
                            <th></th>
                        </tr>
                        {stockRows} 
                    </tbody>
                </table>
            </div>
        );
    }
}

export default stockTable;