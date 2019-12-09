import React from "react";

import { storiesOf } from "@storybook/react";
import OauthPopup from "../src/";

storiesOf("Oauth-Popups", module)
  .add("basic", () => (
    <OauthPopup>basic</OauthPopup>
  ))
  .add("basic with url and callback", () => (
    <OauthPopup
      url="?selectedKind=Oauth-Page&selectedStory=basic%20oauth%20page&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel"
      onCode={(code, params) => console.log(code, params)}
      onClose={() => console.log('Popup closed')}
    >
      basic with url and callback
    </OauthPopup>
  ));

storiesOf("Oauth-Page", module)
  .add("basic oauth page", () => (
    <a href="/?code=123&selectedKind=Oauth-Page&selectedStory=basic%20oauth%20page&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel" >
      Connect with react-oauth-popup
    </a>
  ))
