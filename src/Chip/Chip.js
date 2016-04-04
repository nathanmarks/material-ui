import React from 'react';
import keycode from 'keycode';
import ColorManipulator from '../utils/colorManipulator';
import Avatar from '../Avatar';
import EnhancedButton from '../internal/EnhancedButton';
import DeleteIcon from '../svg-icons/content/add-circle';

function getStyles(props, context, state) {
  const {chip} = context.muiTheme;

  const pressedColor = props.backgroundColor ? ColorManipulator.darken(props.backgroundColor, 0.1) : chip.pressedColor;
  const backgroundColor = props.backgroundColor || chip.backgroundColor;

  return {
    avatar: {
      marginRight: -4,
    },
    chip: {
      backgroundColor: state.clicked ? pressedColor : backgroundColor,
      borderRadius: '16px',
      boxShadow: state.focused ? chip.shadow : null,
      display: 'flex',
      whiteSpace: 'nowrap',
      width: 'fit-content',
    },
    closeIcon: {
      color: chip.closeIconColor,
      transform: 'rotate(45deg)',
      margin: '4px 4px 0px -8px',
    },
    label: {
      color: props.labelColor || chip.textColor,
      fontSize: 13,
      fontWeight: chip.fontWeight,
      lineHeight: '32px',
      paddingLeft: '12',
      paddingRight: '12',
      whiteSpace: 'nowrap',
    },
    root: {
    },
  };
}

class Chip extends React.Component {
  static muiName = 'Chip';

  static propTypes = {
    /**
     * This is the [Avatar](/#/components/avatar) element to be displayed on the Chip.
     * If `avatar is an `Avatar` or other element, it will be rendered.
     * If `avatar` is a string, it will be used as the image `src` for an `Avatar`.
     */
    avatar: React.PropTypes.node,

    /**
     * Override the background color of the chip.
     */
    backgroundColor: React.PropTypes.string,

    /**
     * Can be used to render elements inside the Chip.
     */
    children: React.PropTypes.node,

    /**
     * Override the inline-styles of the chip.
     */
    chipStyle: React.PropTypes.object,

    /**
     * CSS `className` of the root element.
     */
    className: React.PropTypes.node,

    /**
     * If true, the Chip displays a delete icon.
     */
    deletable: React.PropTypes.bool,

    /**
     * Can be used to render a label in the Chip.
     */
    label: React.PropTypes.node,

    /**
     * Override the label color.
     */
    labelColor: React.PropTypes.string,

    /**
     * Override the inline-styles of the label.
     */
    labelStyle: React.PropTypes.object,

    /**
     * Callback function fired when the element loses focus.
     * @param {object} event `blur` event targeting the element.
     */
    onBlur: React.PropTypes.func,

    /**
     * Callback function fired when the element gains focus.
     * @param {object} event `focus` event targeting the element.
     */
    onFocus: React.PropTypes.func,

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
     * Callback function fired when the close button is clicked.
     * @param {object} event `touchTap` event targeting the element.
     */
    onRequestClose: React.PropTypes.func,

    /**
     * Callback function for when a touchTap event ends.
     */
    onTouchEnd: React.PropTypes.func,

    /**
     * Callback function for when a touchTap event starts.
     */
    onTouchStart: React.PropTypes.func,

    /**
     * Callback function fired when the `Chip` element is touch-tapped.
     *
     * @param {object} event TouchTap event targeting the `Chip` element.
     */
    onTouchTap: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  };

  static defaultProps = {
    onBlur: () => {},
    onClick: () => {},
    onFocus: () => {},
    onKeyboardFocus: () => {},
    onRequestClose: () => {},
    onTouchEnd: () => {},
    onTouchStart: () => {},
    onTouchTap: () => {},
    onMouseDown: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseUp: () => {},
    avatar: null,
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
  }

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
      this.props.onRequestClose(event);
    } else if (keycode(event) === 'enter') {
      event.preventDefault();
      this.props.onTouchTap(event);
    }
  };

  handleMouseEnter = (event) => {
    this.handleFocus();
    this.props.onMouseEnter(event);
  };

  handleMouseDown = (event) => {
    // Only listen to left clicks
    if (event.button === 0) {
      event.stopPropagation();
      this.setState({clicked: true});
      this.props.onMouseDown(event);
    }
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

  handleTouchStart = (event) => {
    event.stopPropagation();
    this.setState({clicked: true});
    this.props.onTouchStart(event);
  };

  handleTouchEnd = (event) => {
    this.setState({clicked: false});
    this.props.onTouchEnd(event);
  };

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    const chipStyle = prepareStyles(Object.assign(styles.chip, this.props.chipStyle));
    const rootStyle = Object.assign(styles.root, this.props.style);
    const labelStyle = prepareStyles(Object.assign(styles.label, this.props.labelStyle));

    const {className, deletable, ...other} = this.props;
    let {avatar, children, label} = this.props;

    let deleteIcon = deletable ?
      <DeleteIcon
        color={styles.closeIcon.color}
        style={styles.closeIcon}
        onTouchTap={this.handleCloseIconTouchTap}
      /> :
      null;

    // If the`avatar` prop isn't set, check if the first child is an Avatar
    if (!avatar) {
      const childCount = React.Children.count(children);

      if (childCount > 1) {
        children = React.Children.toArray(children);

        if (React.isValidElement(children[0]) && children[0].type === Avatar) {
          avatar = children[0];
          label = children[1];
        }
      }
    }

    if (React.isValidElement(avatar)) {
      avatar = React.cloneElement(avatar, {
        style: Object.assign(styles.avatar, avatar.props.style),
        size: 32,
      });
    } else if (avatar !== null) {
      avatar = <Avatar src={avatar} style={styles.avatar} size={32} />;
    }

    label = label || children;

    return (
      <EnhancedButton
        ref="button"
        className={className}
        disableTouchRipple={true}
        disableFocusRipple={true}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        onTouchEnd={this.handleTouchEnd}
        onTouchStart={this.handleTouchStart}
        onKeyboardFocus={this.handleKeyboardFocus}
        style={rootStyle}
      >
        <div {...other} style={chipStyle}>
          {avatar}
          <span style={labelStyle}>{label}</span>
          {deleteIcon}
        </div>
      </EnhancedButton>
    );
  }
}

export default Chip;
