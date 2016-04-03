import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';

import {
blue300,
indigo900,
} from 'material-ui/styles/colors';

const styles = {
  chip: {
    margin: '4px',
  },
};

export default class ChipExampleSimple extends React.Component {

  handleRequestClose = () => {
    alert('You clicked the delete button.');
  };

  handleTouchTap = () => {
    alert('You clicked the Chip.');
  };

  render() {
    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>

        <Chip label="Text Only" />

        <Chip
          label="Deletable Text"
          deletable={true}
          onTouchTap={this.handleTouchTap}
          onRequestClose={this.handleRequestClose}
          style={styles.chip}
        />

        <Chip
          label="Image Avatar"
          avatar="images/ok-128.jpg"
          onTouchTap={this.handleTouchTap}
          style={styles.chip}
        />

        <Chip
          label="Deletable Image Avatar"
          avatar="images/uxceo-128.jpg"
          deletable={true}
          onTouchTap={this.handleTouchTap}
          onRequestClose={this.handleRequestClose}
          style={styles.chip}
        />

        <Chip label="SVG Icon Avatar"
          avatar={<Avatar color="#444" icon={<SvgIconFace />} />}
          style={styles.chip}
        />

        <Chip
          label="Font Icon Avatar"
          avatar={<Avatar icon={<FontIcon className="material-icons">perm_identity</FontIcon>} />}
          style={styles.chip}
        />

        <Chip>Composed Label</Chip>

        <Chip style={styles.chip}>
          <Avatar src="images/kolage-128.jpg" />
          Composed Image Avatar
        </Chip>

        <Chip deletable={true} style={styles.chip} >
          <Avatar src={'images/kerem-128.jpg'} />
          Composed Image Avatar
        </Chip>

        <Chip style={styles.chip} >
          <Avatar color="#444" icon={<SvgIconFace />} />
          Composed SvgIcon Avatar
        </Chip>

        <Chip style={styles.chip}>
          <Avatar size={32}>A</Avatar>
          Composed Text Avatar
        </Chip>

        <Chip
          backgroundColor={blue300}
          deletable={true}
          style={styles.chip}
        >
          <Avatar size={32} color={blue300} backgroundColor={indigo900}>MB</Avatar>
          Colored Avatar
        </Chip>
      </div>
    );
  }
}
