import Appdata from '../data/app-data';

class AppdataModel {
    getMaxStockTileInView() {
        return Appdata.maxStockTilesInView;
    }

    getAppData() {
        return Appdata;
    }
}

export default AppdataModel;