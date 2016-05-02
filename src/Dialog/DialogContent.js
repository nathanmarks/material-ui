import React, {Component, PropTypes} from 'react';
import jss from '../styles/jss';

const getStyles = (props, context) => {
  const {
    baseTheme: {
      spacing,
    },
    dialog,
  } = context.muiTheme;

  const gutter = spacing.desktopGutter;

  return jss.createStyleSheet({
    content: {
      fontSize: dialog.bodyFontSize,
      color: dialog.bodyColor,
      padding: `0 ${gutter}px ${gutter}px ${gutter}px`,
      '&:first-child': {
        paddingTop: gutter,
      },
    },
  }).attach();
};

export default class DialogContent extends Component {
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
      <div className={classes.content}>{children}</div>
    );
  }
}
