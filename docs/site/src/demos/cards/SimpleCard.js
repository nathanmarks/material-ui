// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import {
  Card,
  CardMedia,
  CardHeader,
} from 'material-ui/Card';
import reptileImage from 'docs/site/assets/images/contemplative-reptile@2x.jpg';

const styleSheet = createStyleSheet('SimpleCard', () => ({
  card: { maxWidth: 345 },
}));

export default function SimpleCard(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia>
          <img src={reptileImage} alt="Contemplative Reptile" />
        </CardMedia>
        <CardHeader
          title="Title"
          subhead="subhead"
        />
      </Card>
    </div>
  );
}

SimpleCard.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
