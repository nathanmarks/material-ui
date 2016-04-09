import React from 'react';
import keycode from 'keycode';
import ColorManipulator from '../utils/colorManipulator';
import EnhancedButton from '../internal/EnhancedButton';
import DeleteIcon from '../svg-icons/navigation/cancel';

function getStyles(props, context, state) {
  const {chip} = context.muiTheme;

  const pressedColor = props.backgroundColor ? ColorManipulator.darken(props.backgroundColor, 0.1) : chip.pressedColor;
  const backgroundColor = props.backgroundColor || chip.backgroundColor;

  return {
    avatar: {
      marginRight: -4,
    },
    closeIcon: {
      color: chip.closeIconColor,
      margin: '4px 4px 0px -8px',
    },
    label: {
      color: props.labelColor || chip.textColor,
      fontSize: 13,
      fontWeight: chip.fontWeight,
      lineHeight: '32px',
      paddingLeft: 12,
      paddingRight: 12,
      whiteSpace: 'nowrap',
    },
    root: {
      backgroundColor: state.clicked ? pressedColor : backgroundColor,
      borderRadius: 16,
      boxShadow: state.focused ? chip.shadow : null,
      display: 'flex',
      whiteSpace: 'nowrap',
      width: 'fit-content',
    },
  };
}

class Chip extends React.Component {

  static propTypes = {

    /**
     * Override the background color of the chip.
     */
    backgroundColor: React.PropTypes.string,

    /**
     * Used to render elements inside the Chip.
     */
    children: React.PropTypes.node,

    /**
     * CSS `className` of the root element.
     */
    className: React.PropTypes.node,

    /**
     * Override the label color.
     */
    labelColor: React.PropTypes.string,

    /**
     * Override the inline-styles of the label.
     */
    labelStyle: React.PropTypes.object,

    /** @ignore */
    onBlur: React.PropTypes.func,

    /** @ignore */
    onFocus: React.PropTypes.func,

    /** @ignore */
    onKeyDown: React.PropTypes.func,

    /** @ignore */
    onKeyboardFocus: React.PropTypes.func,

    /** @ignore */
    onMouseDown: React.PropTypes.func,

    /** @ignore */
    onMouseEnter: React.PropTypes.func,

    /** @ignore */
    onMouseLeave: React.PropTypes.func,

    /** @ignore */
    onMouseUp: React.PropTypes.func,

    /**
     * Callback function fired when the close button is clicked. If set, the close button will be shown.
     * @param {object} event `touchTap` event targeting the element.
     */
    onRequestClose: React.PropTypes.func,

    /** @ignore */
    onTouchEnd: React.PropTypes.func,

    /** @ignore */
    onTouchStart: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  };

  static defaultProps = {
    onBlur: () => {},
    onFocus: () => {},
    onKeyDown: () => {},
    onKeyboardFocus: () => {},
    onMouseDown: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseUp: () => {},
    onTouchEnd: () => {},
    onTouchStart: () => {},
  };

  static contextTypes = {muiTheme: React.PropTypes.object.isRequired};

  state = {clicked: false, focused: false};

  handleBlur = (event) => {
    this.setState({clicked: false, focused: false});
    this.props.onBlur(event);
  };

  handleCloseIconTouchTap = (event) => {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();
    this.props.onRequestClose(event);
  };

  handleFocus= (event) => {
    this.setState({focused: true});
    this.props.onFocus(event);
  };

  handleKeyboardFocus = (event, keyboardFocused) => {
    if (keyboardFocused) {
      this.handleFocus();
    } else if (!this.state.hovered) {
      this.handleBlur();
    }

    this.props.onKeyboardFocus(event, keyboardFocused);
  };

  handleKeyDown = (event) => {
    if (keycode(event) === 'backspace') {
      event.preventDefault();
      if (this.props.onRequestClose) {
        this.props.onRequestClose(event);
      }
    }
    this.props.onKeyDown(event);
  };

  handleMouseDown = (event) => {
    // Only listen to left clicks
    if (event.button === 0) {
      event.stopPropagation();
      this.setState({clicked: true});
    }
    this.props.onMouseDown(event);
  };

  handleMouseEnter = (event) => {
    this.handleFocus();
    this.props.onMouseEnter(event);
  };

  handleMouseLeave = (event) => {
    if (!this.refs.button.isKeyboardFocused()) {
      this.handleBlur();
    }
    this.props.onMouseLeave(event);
  };

  handleMouseUp = (event) => {
    this.setState({clicked: false});
    this.props.onMouseUp(event);
  };

  handleTouchEnd = (event) => {
    this.setState({clicked: false});
    this.props.onTouchEnd(event);
  };

  handleTouchStart = (event) => {
    event.stopPropagation();
    this.setState({clicked: true});
    this.props.onTouchStart(event);
  };


  render() {
    const buttonEventHandlers = {
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyDown,
      onMouseDown: this.handleMouseDown,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onMouseUp: this.handleMouseUp,
      onTouchEnd: this.handleTouchEnd,
      onTouchStart: this.handleTouchStart,
      onKeyboardFocus: this.handleKeyboardFocus,
    };

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    let {children, style, className, labelStyle, ...other} = this.props;
    const deletable = this.props.onRequestClose;
    let avatar = null;

    style = Object.assign(styles.root, style);
    labelStyle = prepareStyles(Object.assign(styles.label, labelStyle));

    const deleteIcon = deletable ?
      <DeleteIcon
        color={styles.closeIcon.color}
        style={styles.closeIcon}
        onClick={this.handleCloseIconTouchTap}
        onTouchTap={this.handleCloseIconTouchTap}
      /> :
      null;

    const childCount = React.Children.count(children);

    // If the first child is an avatar, extract it and style it
    if (childCount > 1) {
      children = React.Children.toArray(children);

      if (React.isValidElement(children[0]) && children[0].type.muiName === 'Avatar') {
        avatar = children.shift();

        avatar = React.cloneElement(avatar, {
          style: Object.assign(styles.avatar, avatar.props.style),
          size: 32,
        });
      }
    }

    return (
      <EnhancedButton
        {...other}
        {...buttonEventHandlers}
        className={className}
        containerElement="div" // Firefox doesn't support nested buttons
        disableTouchRipple={true}
        disableFocusRipple={true}
        ref="button"
        style={style}
      >
        {avatar}
        <span style={labelStyle}>{children}</span>
        {deleteIcon}
      </EnhancedButton>
    );
  }
}

export default Chip;
