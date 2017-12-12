import React, { Component } from 'react';

class pickStockNav extends Component {
    render() {
        return  (            
            <div >
                <button onClick={this.props.countUpdateHandler.bind(this, this.props.counter)}> {this.props.text} </button>
            </div>
        );
    }
}

export default pickStockNav;