import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
//import 'react-perfect-scrollbar/dist/css/styles.css';
import Routes from './routes';
//theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import { BaseOptionChartStyle } from './Components/charts/BaseOptionChart';

const browserHistory = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <ThemeConfig>
        <GlobalStyles />
        <BaseOptionChartStyle />
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeConfig>
    );
  }
}
