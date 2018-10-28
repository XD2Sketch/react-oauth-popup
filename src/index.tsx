import * as React from 'react'

type props = {
  width?: number,
  height?: number,
  url: string,
  title?: string,
  onCode: (code: string) => any,
  children?: any,
}

const defaultProps = {
    width: 500,
    height: 500,
  };

//popups are evil and needs to be called just after a button is clicked or something. 
//so we show the popup and then later deal with connecting it to the correct URL
//the first token in the tokenNames decides when we have the token
export function AuthPopup(url: string,tokenNames?:string[],  options?:{title?: string, width?: number, height?: number, existingWindow?:Window}) {
    
    options = options ||{};
    if(!options.width)
        options.width = window.innerWidth - 10;
    if(!options.height)
        options.height = window.innerHeight - 10;

    const left = window.screenX + (window.outerWidth - options.width) / 2;
    const top = window.screenY + (window.outerHeight - options.height) / 2.5;
    
    if(!tokenNames || tokenNames.length ==0)
        tokenNames=['code'];

    const externalWindow: any = (options && options.existingWindow) || window.open(
        url,
        (options && options.title)||'Authenticating',
        `width=${options.width || defaultProps.width},height=${options.height || defaultProps.height},left=${left},top=${top}`
    );
    if (null == externalWindow)
        throw 'Failed to open poup';

    let UserCloseRequested = false;

    const codePromise = new Promise<string[]>((resolve, reject) => {
         const codeCheck = setInterval(() => {
            try {
                if (externalWindow.closed) {
                    if (!UserCloseRequested) {
                        reject('Failed to get access');
                    }
                    clearInterval(codeCheck);
                    return;
                }

                const params = new URL(externalWindow.location as any).searchParams;
            
                const code = params.get(tokenNames[0]||'code');
                if (!code) {
                    return;
                }
                

                const codeArray = [code];
                for(let i=1;i<tokenNames.length;i++){
                    codeArray.push( params.get(tokenNames[i]));
                }
                clearInterval(codeCheck);
                resolve(codeArray);
                externalWindow.close();
            } catch (e) {
                
                console.debug('window is not yet redirected');
                //we will get here for security violation till we get redirected back to us
                //reject(e);
                //throw e;
            }
    },2000);

    /*
        not use and for futre this throws error for EDGE
         externalWindow.onbeforeunload = () => {
            
            //we handle on close. no need to clear here. This gets triggered when we navigate which is an issue
            //clearInterval(codeCheck);
        }
    */
    });

    return {
        codePromise,

        navigate: (url) => {
            
            externalWindow.location = url;
        },


        close: () => {
            if (externalWindow) {
                UserCloseRequested = true;
                externalWindow.close();
            }
        }

    };


}

export default class OauthPopup extends React.PureComponent<props> {

  auth:any = null;
  createPopup = () => {
    const { url, title, width, height, onCode } = this.props;

    this.auth = AuthPopup(url,null, {title, width, height});
    this.auth.codePromise.then(code => onCode(code));


  };

  render() {
    return <div onClick={this.createPopup}> {this.props.children} </div>;
  }

  componentWillUnmount() {
      if (this.auth)
          return this.auth.close();

    
    
  }
}
