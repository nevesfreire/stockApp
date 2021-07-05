import './App.css';
import React from 'react';
import StockMarket from './components/StockMarket';
import LineChart from './components/LineChart';
import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <div class='everything'>

  <Provider store={store} > 
    <StockMarket />
    <LineChart />
  </Provider>
    </div>
  );
}

export default App;
