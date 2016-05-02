import React, {Component, PropTypes} from 'react';
import jss from '../styles/jss';
import classNames from 'classnames';

const {classes} = jss.createStyleSheet({
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: '8px 4px',
  },
  action: {
    margin: '0 4px',
  },
  button: {
    minWidth: '64px !important', // EWWWW
  },
}).attach();

export default class DialogActions extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  renderButton = (button) => (
    <div className={classes.action}>
      {React.cloneElement(
        button,
        {className: classNames(classes.button, button.className)}
      )}
    </div>
  );

  render() {
    return (
      <div className={classes.actions}>
        {React.Children.map(this.props.children, this.renderButton)}
      </div>
    );
  }
}
