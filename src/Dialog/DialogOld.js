import React from 'react';
import RenderToLayer from '../internal/RenderToLayer';

class DialogOld extends React.Component {
  static propTypes = {
    /**
     * Action buttons to display below the Dialog content (`children`).
     * This property accepts either a React element, or an array of React elements.
     */
    actions: React.PropTypes.node,

    /**
     * The `className` to add to the actions container's root element.
     */
    actionsContainerClassName: React.PropTypes.string,

    /**
     * Overrides the inline-styles of the actions container's root element.
     */
    actionsContainerStyle: React.PropTypes.object,

    /**
     * If set to true, the height of the `Dialog` will be auto detected. A max height
     * will be enforced so that the content does not extend beyond the viewport.
     */
    autoDetectWindowHeight: React.PropTypes.bool,

    /**
     * If set to true, the body content of the `Dialog` will be scrollable.
     */
    autoScrollBodyContent: React.PropTypes.bool,

    /**
     * The `className` to add to the content's root element under the title.
     */
    bodyClassName: React.PropTypes.string,

    /**
     * Overrides the inline-styles of the content's root element under the title.
     */
    bodyStyle: React.PropTypes.object,

    /**
     * The contents of the `Dialog`.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * The `className` to add to the content container.
     */
    contentClassName: React.PropTypes.string,

    /**
     * Overrides the inline-styles of the content container.
     */
    contentStyle: React.PropTypes.object,

    /**
     * Force the user to use one of the actions in the `Dialog`.
     * Clicking outside the `Dialog` will not trigger the `onRequestClose`.
     */
    modal: React.PropTypes.bool,

    /**
     * Fired when the `Dialog` is requested to be closed by a click outside the `Dialog` or on the buttons.
     *
     * @param {bool} buttonClicked Determines whether a button click triggered this request.
     */
    onRequestClose: React.PropTypes.func,

    /**
     * Controls whether the Dialog is opened or not.
     */
    open: React.PropTypes.bool.isRequired,

    /**
     * The `className` to add to the `Overlay` component that is rendered behind the `Dialog`.
     */
    overlayClassName: React.PropTypes.string,

    /**
     * Overrides the inline-styles of the `Overlay` component that is rendered behind the `Dialog`.
     */
    overlayStyle: React.PropTypes.object,

    /**
     * Determines whether the `Dialog` should be repositioned when it's contents are updated.
     */
    repositionOnUpdate: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The title to display on the `Dialog`. Could be number, string, element or an array containing these types.
     */
    title: React.PropTypes.node,

    /**
     * The `className` to add to the title's root container element.
     */
    titleClassName: React.PropTypes.string,

    /**
     * Overrides the inline-styles of the title's root container element.
     */
    titleStyle: React.PropTypes.object,
  };

  static defaultProps = {
    autoDetectWindowHeight: true,
    autoScrollBodyContent: false,
    modal: false,
    repositionOnUpdate: true,
  };

  renderLayer = () => {
    return (
      <DialogInline {...this.props} />
    );
  };

  render() {
    return (
      <RenderToLayer render={this.renderLayer} open={true} useLayerForClickAway={false} />
    );
  }
}

export default DialogOld;
