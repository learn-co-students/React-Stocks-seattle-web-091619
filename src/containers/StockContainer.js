import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    let stocks = this.props.stocks
    return (
      <div>
        <h2>Stocks</h2>
        {
          //render the list of stocks here
          stocks.map(stock => <Stock stock={stock} addStock={this.props.addStock} /> )
        }
      </div>
    );
  }

}

export default StockContainer;
