import {Component, PropTypes} from 'react';
import {createMuiTheme} from './theme';

class MuiThemeXProvider extends Component {

  static propTypes = {
    children: PropTypes.element,
    muiThemeX: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    muiThemeX: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      muiThemeX: this.props.muiThemeX || createMuiTheme(),
    };
  }

  render() {
    return this.props.children;
  }
}

export default MuiThemeXProvider;
