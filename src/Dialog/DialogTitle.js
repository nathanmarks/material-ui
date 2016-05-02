import React, {Component, PropTypes} from 'react';
import jss from '../styles/jss';

const getStyles = (props, context) => {
  const {
    baseTheme: {
      spacing,
      palette,
    },
    dialog,
  } = context.muiTheme;

  const gutter = spacing.desktopGutter;
  return jss.createStyleSheet({
    title: {
      margin: 0,
      padding: `${gutter}px ${gutter}px 20px ${gutter}px`,
      color: palette.textColor,
      fontSize: dialog.titleFontSize,
      lineHeight: '32px',
      fontWeight: 400,
    },
  }).attach();
};

export default class DialogTitle extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children;
  }

  render() {
    const {
      children,
    } = this.props;

    const {classes} = getStyles(this.props, this.context);

    return (
      <h3 className={classes.title}>{children}</h3>
    );
  }
}
