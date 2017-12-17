import React, { Component } from 'react';

class applyFilter extends Component {

    constructor (props) {
        super(props)
        this.state = {};
        this.state.showPopup = false;
        this.data = {};
        this.data.noofFilters = 0;
    }
    
    countFilters(props) {
        return props.filterCategoryList.reduce((count, filterCategory) => {
            return filterCategory.filters.reduce((count, filter) => {
                return (filter.value) ? ++count: count ;
            }, count);
        }, 0);
    }

    componentWillMount () {
        this.data.noofFilters = this.countFilters(this.props);
    }

    componentWillReceiveProps (nextProps) {
        this.data.noofFilters = this.countFilters(nextProps);
    }

    togglePopup() {
        this.setState(function (prevState) {
            let nextState = {};
            nextState.showPopup = !prevState.showPopup;
            return nextState;
        });
    }

    render() {
        return  (
            <div>
                <div className="apply-filter-container">
                    <div className="apply-filter-ctrl" onClick={this.togglePopup.bind(this)}>
                        <div className="filter-image"> </div>
                        <span>APPLY FILTER</span>
                        <div className="filter-count"> {this.data.noofFilters} </div>
                    </div>
                </div>
                <Popuplayout 
                    show={this.state.showPopup} 
                    filterCategoryList={this.props.filterCategoryList}
                    handleFilterCtrl={this.props.handleFilterCtrl.bind(this)}>
                </Popuplayout>
            </div>
        );
    }
}

class Popuplayout extends Component {

    render () {
        let popupClass = (this.props.show)? 'show' : 'hide';
        let filterCategoryList = this.props.filterCategoryList.map((filterCategory) => {
            return (
                <fieldset key={filterCategory.id}>
                    <h3> {filterCategory.label} </h3>
                    <div className="filter-holder">
                        {filterCategory.filters.map((filter) => {
                            return (
                                <div key={filter.id} >
                                    <input type="checkbox" 
                                        name={filter.id} 
                                        defaultChecked={filter.value} 
                                        onChange={this.props.handleFilterCtrl.bind(this, filter.id, filterCategory.id)}/>
                                    {filter.label}
                                </div>
                            );
                        })}
                    </div>
                </fieldset>
            );
        });
        return (
            <div className={'popup-container ' + popupClass} >
                {filterCategoryList}
            </div>
        );
    }
}

export default applyFilter;