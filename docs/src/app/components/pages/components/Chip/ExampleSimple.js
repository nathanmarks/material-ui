import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';

const style = {
  margin: '4px',
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

        <Chip label="Text Only" style={style} />

        <Chip
          label="Deletable Text"
          deletable={true}
          onTouchTap={handleTouchTap}
          onRequestClose={handleRequestClose}
          style={style}
        />

        <Chip
          label="Image Avatar"
          avatar="images/ok-128.jpg"
          onTouchTap={handleTouchTap}
          style={style}
        />

        <Chip
          label="Deletable Image Avatar"
          avatar="images/uxceo-128.jpg"
          deletable={true}
          onTouchTap={handleTouchTap}
          onRequestClose={handleRequestClose}
          style={style}
        />

        <Chip label="SVG Icon Avatar"
          avatar={<Avatar color="#444" icon={<SvgIconFace />} />}
          style={style}
        />

        <Chip
          label="Font Icon Avatar"
          avatar={<Avatar icon={<FontIcon className="material-icons">perm_identity</FontIcon>} />}
          style={style}
        />

        <Chip>Composed Label</Chip>

        <Chip style={style}>
          <Avatar src="images/kolage-128.jpg" />
          Composed Image Avatar
        </Chip>

        <Chip deletable={true} style={style} >
          <Avatar src={'images/kerem-128.jpg'} />
          Composed Image Avatar
        </Chip>

        <Chip style={style} >
          <Avatar color="#444" icon={<SvgIconFace />} />
          Composed SvgIcon Avatar
        </Chip>

        <Chip style={style}>
          <Avatar size={32}>A</Avatar>
          Composed Text Avatar
        </Chip>

        <Chip
          backgroundColor={blue300}
          deletable={true}
          style={style}
        >
          <Avatar size={32} color={blue300} backgroundColor={indigo900}>MB</Avatar>
          Colored Avatar
        </Chip>
      </div>
    );
  }
}
