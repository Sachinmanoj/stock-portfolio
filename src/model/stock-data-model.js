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

    getTimeData () {
        var firstStock = Object.keys(Stockdata.historical)[0];
        // TODO - Insufficent Historical data 
        return Stockdata.historical[firstStock].point.map((point) => {
            return point.date;
        });
    }

    getPriceOfStockInTime(stockId, time) {
        // TODO - Insufficent Historical data 
        var data = Stockdata.historical[stockId].point.find((point) => {
            return point.date === time;
        });        
        return data ? data.price : 0;
    }
}

export default StockdataModel;