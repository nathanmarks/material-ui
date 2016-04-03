import React from 'react';
import Avatar from '../Avatar';
import EnhancedButton from '../internal/EnhancedButton';
import DeleteIcon from '../svg-icons/content/add-circle';

function getStyles(props, context, state) {
  const {chip} = context.muiTheme;

  return {
    root: {
      backgroundColor: state.clicked ? chip.pressedColor : chip.backgroundColor,
      borderRadius: '16px',
      boxShadow: state.focused ? chip.shadow : null,
      display: 'flex',
      whiteSpace: 'nowrap',
      width: 'fit-content',
    },
    avatar: {
      marginRight: -4,
    },
    closeIcon: {
      color: chip.closeIconColor,
      transform: 'rotate(45deg)',
      margin: '4px 4px 0px -8px',
    },
    label: {
      color: props.labelColor || chip.labelColor,
      fontSize: 13,
      fontWeight: chip.fontWeight,
      lineHeight: '32px',
      paddingLeft: '12',
      paddingRight: '12',
      whiteSpace: 'nowrap',
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
     * Can be used to render elements inside the Chip.
     */
    children: React.PropTypes.node,

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
     * Callback function fired when the close button is clicked.
     * @param {object} event `touchTap` event targeting the element.
     */
    onRequestClose: React.PropTypes.func,

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
    onTouchTap: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    avatar: null,
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  state = {
    clicked: false,
    focused: false,
  };

  blur = () => {
    this.setState({
      focused: false,
    });
  };

  focus = () => {
    this.setState({
      focused: true,
    });
  };

  handleBlur = (event) => {
    this.blur();
    if (this.props.onBlur) this.props.onBlur(event);
  };

  handleFocus = (event) => {
    this.focus();
    if (this.props.onFocus) this.props.onFocus(event);
  };

  handleMouseEnter = (event) => {
    this.focus();
    if (this.props.onMouseEnter) this.props.onMouseEnter(event);
  };

  handleMouseLeave = (event) => {
    if (!this.refs.button.isKeyboardFocused()) this.blur();
    if (this.props.onMouseLeave) this.props.onMouseLeave(event);
  };

  handleKeyboardFocus = (event, keyboardFocused) => {
    if (keyboardFocused) {
      this.focus();
      if (this.props.onFocus) this.props.onFocus(event);
    } else if (!this.state.hovered) {
      this.blur();
      if (this.props.onBlur) this.props.onBlur(event);
    }
    if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(event, keyboardFocused);
  };

  handleCloseIconTouchTap = (event) => {
    //Stop the event from bubbling up to the list-item
    event.stopPropagation();
    if (this.props.onRequestClose) this.props.onRequestClose(event);
  };

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    const rootStyle = prepareStyles(Object.assign(styles.root, this.props.style));
    const labelStyle = prepareStyles(Object.assign(styles.label, this.props.labelStyle));

    const {children, className, deletable, ...other} = this.props;
    let {avatar, label} = this.props;

    if (React.isValidElement(avatar)) {
      avatar = React.cloneElement(avatar, {
        style: Object.assign(styles.avatar, avatar.props.style),
        size: 32,
      });
    } else if (avatar !== null) {
      avatar = <Avatar src={avatar} style={styles.avatar} size={32} />;
    }

    label = label || children;
    const deleteIcon = deletable ? <DeleteIcon color={styles.closeIcon.color} style={styles.closeIcon} onTouchTap={this.handleCloseIconTouchTap} /> : null;

    return (
      <EnhancedButton
        ref="button"
        className={className}
        disableTouchRipple={true}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseLeave={this.handleMouseLeave}
        onMouseEnter={this.handleMouseEnter}
        onKeyboardFocus={this.handleKeyboardFocus}
      >
        <div {...other} style={rootStyle}>
          {avatar}
          <span style={labelStyle}>{label}</span>
          {deleteIcon}
        </div>
      </EnhancedButton>
    );
  }
}

export default Chip;
