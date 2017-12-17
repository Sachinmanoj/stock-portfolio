import Appdata from '../data/app-data';

class AppdataModel {
    getMaxStockTileInView() {
        return Appdata.maxStockTilesInView;
    }

    getAppData() {
        return Appdata;
    }

    getFilterCatogories() {
        return Appdata.filterCategories;
    }
}

export default AppdataModel;