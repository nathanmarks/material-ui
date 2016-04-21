import React, {Component, PropTypes} from 'react';
import {StyleSheet, css} from 'aphrodite';
import Portal from 'react-overlays/lib/Portal';
import Paper from '../Paper';
import propTypes from '../utils/propTypes';

const getStyles = () => {
  const popover = {};
  return StyleSheet.create({popover});
};

export default class Popover extends Component {
  static propTypes = {
    /**
     * This is the DOM element that will be used to set the position of the
     * popover.
     */
    anchorEl: React.PropTypes.object,
    /**
     * This is the point on the anchor where the popover's
     * `targetOrigin` will attach to.
     * Options:
     * vertical: [top, middle, bottom];
     * horizontal: [left, center, right].
     */
    anchorOrigin: propTypes.origin,
    /**
     * If true, the popover will apply transitions when
     * it is added to the DOM.
     */
    animated: React.PropTypes.bool,
    /**
     * If true, the popover will hide when the anchor is scrolled off the screen.
     */
    autoCloseWhenOffScreen: React.PropTypes.bool,
    /**
     * If true, the popover (potentially) ignores `targetOrigin`
     * and `anchorOrigin` to make itself fit on screen,
     * which is useful for mobile devices.
     */
    canAutoPosition: React.PropTypes.bool,
    /**
     * The content of the popover.
     */
    children: React.PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: React.PropTypes.string,
    /**
     * Callback function fired when the popover is requested to be closed.
     *
     * @param {string} reason The reason for the close request. Possibles values
     * are 'clickAway' and 'offScreen'.
     */
    onRequestClose: React.PropTypes.func,
    /**
     * If true, the popover is visible.
     */
    open: React.PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    /**
     * This is the point on the popover which will attach to
     * the anchor's origin.
     * Options:
     * vertical: [top, middle, bottom];
     * horizontal: [left, center, right].
     */
    targetOrigin: propTypes.origin,
    /**
     * Override the default transition component used.
     */
    transition: React.PropTypes.func,
    /**
     * If true, the popover will render on top of an invisible
     * layer, which will prevent clicks to the underlying
     * elements, and trigger an `onRequestClose('clickAway')` call.
     */
    useLayerForClickAway: React.PropTypes.bool,
    /**
     * The zDepth of the popover.
     */
    zDepth: propTypes.zDepth,
  };

  static defaultProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    animated: true,
    autoCloseWhenOffScreen: true,
    canAutoPosition: true,
    onRequestClose: () => {},
    open: false,
    targetOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    useLayerForClickAway: true,
    zDepth: 1,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      animated, // eslint-disable-line no-unused-vars
      children,
      open,
      ...other,
    } = this.props;

    const styles = getStyles();

    return open && (
      <Portal>
        <Paper className={css(styles.popover)} {...other}>
          {children}
        </Paper>
      </Portal>
    );
  }
}
