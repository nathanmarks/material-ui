// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('CardHeader', () => ({
  cardHeader: {},
}), { index: 10 });

export default function CardHeader(props, context) {
  const {
    className: classNameProp,
    subhead,
    title,
    ...other,
  } = props;

  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.cardHeader, classNameProp);

  return (
    <div className={className} {...other}>
      <h1>{title}</h1>
      <p>{subhead}</p>
    </div>
  );
}

CardHeader.propTypes = {
  className: PropTypes.string,
  subhead: PropTypes.string,
  title: PropTypes.string,
};

CardHeader.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
