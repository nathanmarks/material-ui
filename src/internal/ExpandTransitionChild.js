import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import transitions from '../styles/transitions';

class ExpandTransitionChild extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    transitionDelay: PropTypes.number,
    transitionDuration: PropTypes.number,
  };

  static defaultProps = {
    transitionDelay: 0,
    transitionDuration: 450,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentDidUpdate() {
    this.open();
  }

  componentWillUnmount() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
  }

  componentWillAppear(callback) {
    this.open();
    callback();
  }

  componentWillEnter(callback) {
    const {transitionDelay} = this.props;
    const {style} = ReactDOM.findDOMNode(this);
    style.height = 0;
    this.enterTimer = setTimeout(() => callback(), transitionDelay);
  }

  componentDidEnter() {
    this.open();
  }

  componentWillLeave(callback) {
    const {transitionDuration} = this.props;
    const {style} = ReactDOM.findDOMNode(this);
    style.height = this.refs.wrapper.clientHeight;
    style.height = 0;
    this.leaveTimer = setTimeout(() => callback(), transitionDuration);
  }

  open() {
    const {style} = ReactDOM.findDOMNode(this);
    style.height = `${this.refs.wrapper.clientHeight}px`;
  }

  render() {
    const {
      children,
      style,
      transitionDelay, // eslint-disable-line no-unused-vars
      transitionDuration,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;

    const mergedRootStyles = Object.assign({
      position: 'relative',
      height: 0,
      width: '100%',
      top: 0,
      left: 0,
      overflow: 'hidden',
      transition: transitions.easeOut(`${transitionDuration}ms`, ['height', 'opacity']),
    }, style);

    return (
      <div {...other} style={prepareStyles(mergedRootStyles)}>
        <div ref="wrapper">{children}</div>
      </div>
    );
  }
}

export default ExpandTransitionChild;
