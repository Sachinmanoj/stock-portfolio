import Stockdata from '../data/stock-data';
import StockList from '../data/stock-details';

class StockdataModel {
    
    getTotalNoOfStocks() {
        return StockList.length;
    }

    getStockList() {
        return StockList;
    }

    getPriceOfStock(stockid) {
        return Stockdata.price[stockid];
    }

    getEpsOfStock(stockid) {
        return Stockdata.eps[stockid];
    }

    getStockdata() {
        return Stockdata;
    }
}

export default StockdataModel;