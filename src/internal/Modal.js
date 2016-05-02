import React, {Component, PropTypes} from 'react';
import Modal from 'react-overlays/lib/Modal';
import jss from '../styles/jss';

const getStyles = (props, context) => {
  const {muiTheme} = context;

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

  return jss.createStyleSheet({modal, overlay}).attach();
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

    const {classes} = getStyles(this.props, this.context);

    return (
      <Modal
        className={classes.modal}
        backdropClassName={classes.overlay}
        onHide={onRequestClose}
        show={open}
      >
        {children}
      </Modal>
    );
  }
}
