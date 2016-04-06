import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';

const style = {
  margin: 4,
};

function handleRequestClose() {
  alert('You clicked the delete button.');
}

function handleTouchTap() {
  alert('You clicked the Chip.');
}

export default class ChipExampleSimple extends React.Component {

  render() {
    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>

        <Chip style={style}>
          Text Chip
        </Chip>

        <Chip
          deletable={true}
          onRequestClose={handleRequestClose}
          onTouchTap={handleTouchTap}
          style={style}
        >
          Deletable Chip
        </Chip>

        <Chip style={style} onTouchTap={handleTouchTap}>
          <Avatar src="images/kolage-128.jpg" />
          Contact Chip
        </Chip>

        <Chip
          deletable={true}
          onRequestClose={handleRequestClose}
          onTouchTap={handleTouchTap}
          style={style}
        >
          <Avatar src={'images/kerem-128.jpg'} />
          Deletable Contact Chip
        </Chip>

        <Chip style={style}>
          <Avatar icon={<FontIcon className="material-icons">perm_identity</FontIcon>} />
          FontIcon Contact Chip
        </Chip>

        <Chip style={style} >
          <Avatar color="#444" icon={<SvgIconFace />} />
          SvgIcon Contact Chip
        </Chip>

        <Chip style={style}>
          <Avatar size={32}>A</Avatar>
          Text Contact Chip
        </Chip>

        <Chip
          backgroundColor={blue300}
          deletable={true}
          onRequestClose={handleRequestClose}
          style={style}
        >
          <Avatar size={32} color={blue300} backgroundColor={indigo900}>
            MB
          </Avatar>
          Colored Avatar
        </Chip>
      </div>
    );
  }
}
