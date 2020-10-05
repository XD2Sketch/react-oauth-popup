## react-oauth-popup

![Node.js CI](https://github.com/kgoedecke/react-oauth-popup/workflows/Node.js%20CI/badge.svg)

Oauth-Popups are some pretty nasty jams that don't fit well in React. This component allows you declare an oauth-popup inline with your components and handles the nasty window navigation for you.

### Install

NPM:
```bash
npm install react-oauth-popup --save
```

Yarn:
```bash
yarn add react-oauth-popup
```

### Props

* **url** - the url of the oauth navigation screen (instagram/facebook/etc.)
* **onCode** - called when the user has successfully authenticated with the oauth code
* **onClose** - called when the popup will be closed
* **width** - width of the popup window (optional)
* **height** - height of the popup window (optional)
* **title** - title of the popup window (optional)
### Example

```jsx
const onCode = (code, params) => {
  console.log("wooooo a code", code);
  console.log("alright! the URLSearchParams interface from the popup url", params);
}
const onClose = () => console.log("closed!");

function Comp() {
  return (
    <OauthPopup
      url="http://FriendlyMultiNationalTechConglomerate.com"
      onCode={onCode}
      onClose={onClose}
    >
      <div>Click me to open a Popup</div>
    </OauthPopup>
	);
}
```


### License

MIT
