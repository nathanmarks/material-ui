// @flow weak

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/theme';
import createPalette from 'material-ui/styles/palette';
import { blue, pink } from 'material-ui/styles/colors';
import AppRouter from './AppRouter';
import { lightTheme, darkTheme, setPrismTheme } from '../utils/prism';

class App extends Component {
  render() {
    const { dark, ...other } = this.props;

    const palette = createPalette({
      primary: blue,
      accent: pink,
      type: dark ? 'dark' : 'light',
    });

    const muiTheme = createMuiTheme({ palette });

    if (dark) {
      setPrismTheme(darkTheme);
    } else {
      setPrismTheme(lightTheme);
    }

    return (
      <MuiThemeProvider theme={muiTheme} {...other}>
        <AppRouter />
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  dark: PropTypes.bool,
};

const ConnectedApp = connect((state) => ({ dark: state.dark }))(App);

export { ConnectedApp as default }; // needed for live binding
