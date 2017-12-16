import React, { Component } from 'react';

class pickStockNav extends Component {
    render() {
        return  (    
            <a className="stock-nav-btn" disabled={this.props.disableOn} onClick={this.props.countUpdateHandler.bind(this, this.props.counter)}> {this.props.text} </a>
        );
    }
}

export default pickStockNav;