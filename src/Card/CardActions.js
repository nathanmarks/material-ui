// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('CardActions', () => ({
  cardActions: {
    padding: [8, 4],
    '&:last-child': {
      paddingBottom: 24,
    },
  },
}), { index: 10 });

export default function CardActions(props, context) {
  const {
    className: classNameProp,
    ...other,
  } = props;

  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.cardActions, classNameProp);

  return (
    <div className={className} {...other} />
  );
}

CardActions.propTypes = {
  className: PropTypes.string,
};

CardActions.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
