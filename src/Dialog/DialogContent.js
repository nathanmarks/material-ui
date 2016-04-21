import React, {Component, PropTypes} from 'react';
import {StyleSheet, css} from 'aphrodite';

const getStyles = (props, context) => {
  const {
    baseTheme: {
      spacing,
    },
    dialog,
  } = context.muiTheme;

  const gutter = spacing.desktopGutter;
  const styles = StyleSheet.create({
    content: {
      fontSize: dialog.bodyFontSize,
      color: dialog.bodyColor,
      padding: `0 ${gutter}px ${gutter}px ${gutter}px`,
      ':first-child': {
        paddingTop: gutter,
      },
    },
  });

  return styles;
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

    const styles = getStyles(this.props, this.context);

    return (
      <div className={css(styles.content)}>{children}</div>
    );
  }
}
