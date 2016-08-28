// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import Paper from '../Paper';

export const styleSheet = createStyleSheet('Card', () => ({
  card: {
    overflow: 'hidden',
  },
}), { index: 10 });

export default function Card(props, context) {
  const {
    className: classNameProp,
    ...other,
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.card, classNameProp);

  return (
    <Paper className={className} zDepth={2} {...other} />
  );
}

Card.propTypes = {
  className: PropTypes.string,
};

Card.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
