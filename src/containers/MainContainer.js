import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  
  constructor() {
    super()
    this.state = {
      stocks: [],
      displayStocks: [],
      portfolioStocks: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(data => {
      this.setState({
        stocks: data,
        displayStocks: data
      })
    })
  }

  addStock = stock => {
    this.setState({
      portfolioStocks: [...this.state.portfolioStocks, stock]
    })
  }

  removeStock = stock => {
    this.setState({
      // filter() creates an sortedStocksay filled with elements that pass a test provided as a function
      portfolioStocks: this.state.portfolioStocks.filter(keepThisStock => keepThisStock !== stock)
    })
  }

  filterStocks = type => {
    if (type !== 'All') {
      this.setState({
        displayStocks: this.state.stocks.filter(stock => stock.type === type)
      })
    } else {
      this.setState({
        displayStocks: this.state.stocks
      })
    }
  }

  sortStocks = sortBy => {
    let sortedStocks = []
    switch (sortBy) {
      case 'Alphabetically':
        sortedStocks = this.state.displayStocks.sort((s1,s2) => s1.name > s2.name ? 1 : -1)
        break;
      case 'Price':
        sortedStocks = this.state.displayStocks.sort((s1,s2) => s1.price > s2.price ? 1 : -1)
        break;
      default:
        console.log('doodily doo ding dong doodily doo')
    }
    this.setState({
      displayStocks: sortedStocks
    })
  }

  render() {
    return (
      <div>
        <SearchBar filterStocks={this.filterStocks} sortStocks={this.sortStocks} />

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.displayStocks} addStock={this.addStock} />

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.portfolioStocks} removeStock={this.removeStock} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
