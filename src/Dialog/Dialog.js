import React, {Component, PropTypes} from 'react';
import {StyleSheet, css} from 'aphrodite';
import Modal from 'react-overlays/lib/Modal';
import transitions from '../styles/transitions';
import Paper from '../Paper';

const getStyles = (props, context) => {
  const {muiTheme} = context;
  const {spacing} = muiTheme.baseTheme;

  const modal = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'fixed',
    zIndex: muiTheme.zIndex.dialog,
    top: 0,
    left: 0,
  };

  const overlay = {
    ...muiTheme.overlay,
    ...modal,
  };

  const dialog = {
    boxSizing: 'border-box',
    transition: transitions.easeOut(),
    position: 'relative',
    width: '75%',
    maxWidth: spacing.desktopKeylineIncrement * 12,
    margin: '0 auto',
    zIndex: muiTheme.zIndex.dialog,
    ':focus': {
      outline: 'none',
    },
  };

  return StyleSheet.create({dialog, modal, overlay});
};

export default class Dialog extends Component {

  static propTypes = {
    children: PropTypes.any,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
  };

  static defaultProps = {
    open: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      children,
      onRequestClose,
      open,
    } = this.props;

    const styles = getStyles(this.props, this.context);

    return (
      <Modal
        className={css(styles.modal)}
        backdropClassName={css(styles.overlay)}
        onHide={onRequestClose}
        show={open}
      >
        <Paper zDepth={4} className={css(styles.dialog)}>
          {children}
        </Paper>
      </Modal>
    );
  }
}
