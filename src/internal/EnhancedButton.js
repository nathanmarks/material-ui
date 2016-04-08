import React from 'react';
import {createChildFragment} from '../utils/childUtils';
import Events from '../utils/events';
import keycode from 'keycode';
import FocusRipple from './FocusRipple';
import TouchRipple from './TouchRipple';

let styleInjected = false;
let listening = false;
let tabPressed = false;

function injectStyle() {
  if (!styleInjected) {
    // Remove inner padding and border in Firefox 4+.
    const style = document.createElement('style');
    style.innerHTML = `
      button::-moz-focus-inner,
      input::-moz-focus-inner {
        border: 0;
        padding: 0;
      }
    `;

    document.body.appendChild(style);
    styleInjected = true;
  }
}

function listenForTabPresses() {
  if (!listening) {
    Events.on(window, 'keydown', (event) => {
      tabPressed = keycode(event) === 'tab';
    });
    listening = true;
  }
}

class EnhancedButton extends React.Component {
  static propTypes = {
    /** @ignore */
    centerRipple: React.PropTypes.bool,

    /** @ignore */
    children: React.PropTypes.node,

    /** @ignore */
    containerElement: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),

    /** @ignore */
    disableFocusRipple: React.PropTypes.bool,

    /** @ignore */
    disableKeyboardFocus: React.PropTypes.bool,

    /** @ignore */
    disableTouchRipple: React.PropTypes.bool,

    /** @ignore */
    disabled: React.PropTypes.bool,

    /** @ignore */
    focusRippleColor: React.PropTypes.string,

    /** @ignore */
    focusRippleOpacity: React.PropTypes.number,

    /** @ignore */
    keyboardFocused: React.PropTypes.bool,

    /** @ignore */
    linkButton: React.PropTypes.bool,

    /**
     * Callback function fired when the element loses focus.
     * @param {object} event `blur` event targeting the element.
     */
    onBlur: React.PropTypes.func,

    /** @ignore */
    onClick: React.PropTypes.func,

    /**
     * Callback function fired when the element gains focus.
     * @param {object} event `focus` event targeting the element.
     */
    onFocus: React.PropTypes.func,

    /**
     * Callback function fired when a key is pressed.
     * @param {object} event `keyboard` event targeting the element.
     */
    onKeyDown: React.PropTypes.func,

    /**
     * Callback function fired when a key is released.
     * @param {object} event `keyboard` event targeting the element.
     */
    onKeyUp: React.PropTypes.func,

    /**
     * Callback function fired when the element is focused or blurred by the keyboard.
     *
     * @param {object} event `focus` or `blur` event targeting the element.
     * @param {boolean} keyboardFocused Indicates whether the element is focused.
     */
    onKeyboardFocus: React.PropTypes.func,

    /**
     * Callback function fired when a mouse button is pressed down on the element.
     *
     * @param {object} event `mousedown` event targeting the element.
     */
    onMouseDown: React.PropTypes.func,

    /**
     * Callback function fired when the mouse enters the element.
     *
     * @param {object} event `mouseenter` event targeting the element.
     */
    onMouseEnter: React.PropTypes.func,

    /**
     * Callback function fired when the mouse leaves the element.
     *
     * @param {object} event `mouseleave` event targeting the element.
     */
    onMouseLeave: React.PropTypes.func,

    /**
     * Callback function fired when a mouse button is released on the element.
     *
     * @param {object} event `mouseup` event targeting the element.
     */
    onMouseUp: React.PropTypes.func,

    /**
     * Callback function fired when a touchTap event ends.
     *
     * @param {object} event `touch` event targeting the element.
     */
    onTouchEnd: React.PropTypes.func,

    /**
     * Callback function fired when a touchTap event starts.
     *
     * @param {object} event `touch` event targeting the element.
     */
    onTouchStart: React.PropTypes.func,

    /**
     * Callback function fired when the `Chip` element is touch-tapped.
     *
     * @param {object} event TouchTap event targeting the element.
     */
    onTouchTap: React.PropTypes.func,

    /** @ignore */
    style: React.PropTypes.object,

    /** @ignore */
    tabIndex: React.PropTypes.number,

    /** @ignore */
    touchRippleColor: React.PropTypes.string,

    /** @ignore */
    touchRippleOpacity: React.PropTypes.number,

    /** @ignore */
    type: React.PropTypes.string,
  };

  static defaultProps = {
    containerElement: 'button',
    onBlur: () => {},
    onClick: () => {},
    onFocus: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    onKeyboardFocus: () => {},
    onMouseDown: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseUp: () => {},
    onTouchEnd: () => {},
    onTouchStart: () => {},
    onTouchTap: () => {},
    tabIndex: 0,
    type: 'button',
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  state = {isKeyboardFocused: false};

  componentWillMount() {
    const {disabled, disableKeyboardFocus, keyboardFocused} = this.props;
    if (!disabled && keyboardFocused && !disableKeyboardFocus) {
      this.setState({isKeyboardFocused: true});
    }
  }

  componentDidMount() {
    injectStyle();
    listenForTabPresses();
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.disabled || nextProps.disableKeyboardFocus) &&
      this.state.isKeyboardFocused) {
      this.setState({isKeyboardFocused: false});
      if (nextProps.onKeyboardFocus) {
        nextProps.onKeyboardFocus(null, false);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.focusTimeout);
  }

  isKeyboardFocused() {
    return this.state.isKeyboardFocused;
  }

  removeKeyboardFocus(event) {
    if (this.state.isKeyboardFocused) {
      this.setState({isKeyboardFocused: false});
      this.props.onKeyboardFocus(event, false);
    }
  }

  setKeyboardFocus(event) {
    if (!this.state.isKeyboardFocused) {
      this.setState({isKeyboardFocused: true});
      this.props.onKeyboardFocus(event, true);
    }
  }

  cancelFocusTimeout() {
    if (this.focusTimeout) {
      clearTimeout(this.focusTimeout);
      this.focusTimeout = null;
    }
  }

  createButtonChildren() {
    const {
      centerRipple,
      children,
      disabled,
      disableFocusRipple,
      disableKeyboardFocus,
      disableTouchRipple,
      focusRippleColor,
      focusRippleOpacity,
      touchRippleColor,
      touchRippleOpacity,
    } = this.props;
    const {isKeyboardFocused} = this.state;

    //Focus Ripple
    const focusRipple = isKeyboardFocused && !disabled && !disableFocusRipple && !disableKeyboardFocus ? (
      <FocusRipple
        color={focusRippleColor}
        opacity={focusRippleOpacity}
        show={isKeyboardFocused}
      />
    ) : undefined;

    //Touch Ripple
    const touchRipple = !disabled && !disableTouchRipple ? (
      <TouchRipple
        centerRipple={centerRipple}
        color={touchRippleColor}
        opacity={touchRippleOpacity}
      >
        {children}
      </TouchRipple>
    ) : undefined;

    return createChildFragment({
      focusRipple,
      touchRipple,
      children: touchRipple ? undefined : children,
    });
  }

  handleKeyDown = (event) => {
    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      if (keycode(event) === 'enter' && this.state.isKeyboardFocused) {
        this.handleTouchTap(event);
      }
      if (keycode(event) === 'esc' && this.state.isKeyboardFocused) {
        this.removeKeyboardFocus(event);
      }
    }
    this.props.onKeyDown(event);
  };

  handleKeyUp = (event) => {
    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      if (keycode(event) === 'space' && this.state.isKeyboardFocused) {
        this.handleTouchTap(event);
      }
    }
    this.props.onKeyUp(event);
  };

  handleBlur = (event) => {
    this.cancelFocusTimeout();
    this.removeKeyboardFocus(event);
    this.props.onBlur(event);
  };

  handleFocus = (event) => {
    if (event) event.persist();
    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      //setTimeout is needed because the focus event fires first
      //Wait so that we can capture if this was a keyboard focus
      //or touch focus
      this.focusTimeout = setTimeout(() => {
        if (tabPressed) {
          this.setKeyboardFocus(event);
        }
      }, 150);

      this.props.onFocus(event);
    }
  };

  handleClick = (event) => {
    if (!this.props.disabled) {
      tabPressed = false;
      this.props.onClick(event);
    }
  };

  handleTouchTap = (event) => {
    this.cancelFocusTimeout();
    if (!this.props.disabled) {
      tabPressed = false;
      this.removeKeyboardFocus(event);
      this.props.onTouchTap(event);
    }
  };

  render() {
    const {
      centerRipple, // eslint-disable-line no-unused-vars
      children,
      containerElement,
      disabled,
      disableFocusRipple,
      disableKeyboardFocus, // eslint-disable-line no-unused-vars
      disableTouchRipple, // eslint-disable-line no-unused-vars
      focusRippleColor, // eslint-disable-line no-unused-vars
      focusRippleOpacity, // eslint-disable-line no-unused-vars
      linkButton,
      touchRippleColor, // eslint-disable-line no-unused-vars
      touchRippleOpacity, // eslint-disable-line no-unused-vars
      onBlur, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      onKeyUp, // eslint-disable-line no-unused-vars
      onKeyDown, // eslint-disable-line no-unused-vars
      onTouchTap, // eslint-disable-line no-unused-vars
      style,
      tabIndex,
      type,
      ...other,
    } = this.props;

    const {
      prepareStyles,
      enhancedButton,
    } = this.context.muiTheme;

    const mergedStyles = Object.assign({
      border: 10,
      background: 'none',
      boxSizing: 'border-box',
      display: 'inline-block',
      fontFamily: this.context.muiTheme.baseTheme.fontFamily,
      WebkitTapHighlightColor: enhancedButton.tapHighlightColor, // Remove mobile color flashing (deprecated)
      cursor: disabled ? 'default' : 'pointer',
      textDecoration: 'none',
      margin: 0,
      padding: 0,
      outline: 'none',
      font: 'inherit',
      /*
        This is needed so that ripples do not bleed
        past border radius.
        See: http://stackoverflow.com/questions/17298739/
          css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
       */
      transform: disableTouchRipple && disableFocusRipple ? null : 'translate3d(0, 0, 0)',
      verticalAlign: other.hasOwnProperty('href') ? 'middle' : null,
    }, style);

    if (disabled && linkButton) {
      return (
        <span
          {...other}
          style={mergedStyles}
        >
          {children}
        </span>
      );
    }

    const buttonProps = {
      ...other,
      style: prepareStyles(mergedStyles),
      disabled: disabled,
      onBlur: this.handleBlur,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onTouchTap: this.handleTouchTap,
      onKeyUp: this.handleKeyUp,
      onKeyDown: this.handleKeyDown,
      tabIndex: tabIndex,
      type: type,
    };
    const buttonChildren = this.createButtonChildren();

    // Provides backward compatibility. Added to support wrapping around <a> element.
    const targetLinkElement = buttonProps.hasOwnProperty('href') ? 'a' : 'span';

    return React.isValidElement(containerElement) ?
      React.cloneElement(containerElement, buttonProps, buttonChildren) :
      React.createElement(linkButton ? targetLinkElement : containerElement, buttonProps, buttonChildren);
  }
}

export default EnhancedButton;
