// @flow
import * as React from 'react'

type props = {
  width: number,
  height: number,
  url: string,
  title: string,
  onClose: () => *,
  onCode: (code: string, params: *) => *,
  children?: React.Node,
}

export default class OauthPopup extends React.PureComponent<props> {
  static defaultProps = {
    onClose: () => {},
    width: 500,
    height: 500,
    url: "",
    title: ""
  };

  externalWindow: window;
  animationFrameId: AnimationFrameID;

  createPopup = () => {
    const { url, title, width, height } = this.props;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;

    this.externalWindow = window.open(
      url,
      title,
      `width=${width},height=${height},left=${left},top=${top}`
    );
    this.animationFrameId = requestAnimationFrame(this.tick);
    this.externalWindow.onbeforeunload = () => {
      this.closeExternalWindow
    }
  };

  tick = () => {
    const { onCode } = this.props;
    try {
      const params = new URL(this.externalWindow.location).searchParams;
      const code = params.get("code");
      if (code) {
        onCode(code, params);
        this.closeExternalWindow()
      }
    } catch (e) {
    }
    finally {
      if (!this.externalWindow.closed) {
        window.requestAnimationFrame(this.tick);
      }
    }
  }  

  componentWillUnmount() {
    this.closeExternalWindow()
  }

  closeExternalWindow = () => {
    const { onClose } = this.props
    if (this.externalWindow && !this.externalWindow.closed) {
      if (onClose) {
        onClose();
      }
      this.externalWindow.close();
    }

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }
  }

  render() {
    return <div onClick={this.createPopup}> {this.props.children} </div>;
  }
}
