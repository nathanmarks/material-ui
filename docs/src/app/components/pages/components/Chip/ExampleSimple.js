import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';

import {
blue300,
indigo900,
} from 'material-ui/styles/colors';

export default class ChipExampleSimple extends React.Component {

  handleRequestClose = () => {
    alert('You clicked the delete button.');
  };

  handleTouchTap = () => {
    alert('You clicked the Chip.');
  };

  render() {
    return (
      <div>
        <Chip label="Text only"/>

        <Chip
          label="Deletable text"
          deletable={true}
          onTouchTap={this.handleTouchTap}
          onRequestClose={this.handleRequestClose}
        />

        <Chip
          label="Image Avatar"
          avatar="images/uxceo-128.jpg"
          deletable={true}
          onTouchTap={this.handleTouchTap}
          onRequestClose={this.handleRequestClose}
        />

        <Chip
          label="SVG Icon Avatar"
          avatar={<Avatar icon={<SvgIconFace />} />}
        />

        <Chip
          label="Font Icon Avatar"
          avatar={<Avatar icon={<FontIcon className="muidocs-icon-communication-voicemail" />} />}
        />

        <Chip avatar="images/kerem-128.jpg">
          Composed label
        </Chip>

        <Chip avatar={<Avatar size={32}>A</Avatar>}>
          Text Avatar
        </Chip>

        <Chip
          avatar={<Avatar size={32} color={blue300} backgroundColor={indigo900}>MB</Avatar>}
          deletable={true}
          onTouchTap={this.handleTouchTap}
          onRequestClose={this.handleRequestClose}
        >
          Colored Text Avatar
        </Chip>
      </div>
    );
  }
}
