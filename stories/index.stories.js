import React from "react";

import { storiesOf } from "@storybook/react";
import OauthPopup from "../src/";

storiesOf("Oauth-Popups", module).add("basic", () => (
  <OauthPopup> yo </OauthPopup>
));
