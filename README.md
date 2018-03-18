## react-oauth-popup

[![CircleCI](https://circleci.com/gh/Ramshackle-Jamathon/react-oauth-popup.svg?style=svg)](https://circleci.com/gh/Ramshackle-Jamathon/react-oauth-popup)
[![codecov](https://codecov.io/gh/Ramshackle-Jamathon/oauth-popup/branch/master/graph/badge.svg?token=BQlEFJDpcl)](https://codecov.io/gh/Ramshackle-Jamathon/react-oauth-popup)

Oauth-Popups are some pretty nasty jams that don't fit well in React. This component allows you declare an oauth-popup inline with your components and handles the nasty window navigation for you.

### Install

```bash
npm install react-oauth-popup --save
```

### Props

* **url** - the url of the oauth navigation screen (instagram/facebook/etc.)
* **onCode** - called when the user has successfully authenticated with the oauth code
* **width** - width of the popup window (optional)
* **height** - height of the popup window (optional)
* **title** - title of the popup window (optional)
### Example

```jsx
const onCode = (code) => console.log("wooooo a code", code);

function Comp() {
  return (
    <OauthPopup
      url="http://FriendlyMultiNationalTechConglomerate.com"
      onCode={onCode}
    >
      <div>Click me to open a Popup</div>
    </OauthPopup>
	);
}
```


### License

MIT
