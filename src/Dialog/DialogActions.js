import React, {Component, PropTypes} from 'react';
import {StyleSheet, css} from 'aphrodite';
import classNames from 'classnames';

const styles = StyleSheet.create({
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
    minWidth: 64,
  },
});

export default class DialogActions extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  renderButton = (button) => (
    <div className={css(styles.action)}>
      {React.cloneElement(
        button,
        {className: classNames(css(styles.button), button.className)}
      )}
    </div>
  );

  render() {
    return (
      <div className={css(styles.actions)}>
        {React.Children.map(this.props.children, this.renderButton)}
      </div>
    );
  }
}
