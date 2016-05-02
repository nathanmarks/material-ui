import React, {Component, PropTypes} from 'react';
import jss from '../styles/jss';
import transitions from '../styles/transitions';
import Modal from '../internal/Modal';
import Paper from '../Paper';

const getStyles = (props, context) => {
  const {muiTheme} = context;
  const {spacing} = muiTheme.baseTheme;

  const dialog = {
    boxSizing: 'border-box',
    transition: transitions.easeOut(),
    position: 'relative',
    width: '75%',
    maxWidth: spacing.desktopKeylineIncrement * 12,
    margin: '0 auto',
    zIndex: muiTheme.zIndex.dialog,
    '&:focus': {
      outline: 'none',
    },
  };

  return jss.createStyleSheet({dialog}).attach();
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
        onRequestClose={onRequestClose}
        open={open}
      >
        <Paper zDepth={4} className={classes.dialog}>
          {children}
        </Paper>
      </Modal>
    );
  }
}
