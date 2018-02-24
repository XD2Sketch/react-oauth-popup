// @flow
import * as React from 'react'

type props = {
  width: number,
  height: number,
  url: string,
  title: string,
  onCode: (code: string) => *,
  children?: React.Node,
}

export default class OauthPopup extends React.PureComponent<props> {
  static defaultProps = {
    width: 500,
    height: 500,
    url: "",
    title: ""
  };

  externalWindow: window;
  gotCode = false;

  createPopup = () => {
    const { url, title, width, height, onCode } = this.props;
    this.gotCode = false;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    this.externalWindow = window.open(
      url,
      title,
      `width=${width},height=${height},left=${left},top=${top}`
    );

    setInterval(() => {
      try {
        const params = new URL(this.externalWindow.location).searchParams;
        const code = params.get("code");
        if (!code || this.gotCode) {
          return;
        }
        this.gotCode = true;
        onCode(code);
        this.externalWindow.close();
      } catch (e) { }
    }, 20);
  };

  render() {
    return <div onClick={this.createPopup}> {this.props.children} </div>;
  }

  componentWillUnmount() {
    this.externalWindow.close();
  }
}
