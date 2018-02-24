import React from 'react';
import renderer from 'react-test-renderer';
import OauthPopup from "../src/index.js";

test('OauthPopup component renders correctly', () => {
    const tree = renderer.create(
        <OauthPopup>
            <div>coooooooool</div>
            <h2>siiiiiiiick</h2>
            <h2>leeegiiiiit</h2>
            <button>Doooooope</button>
        </OauthPopup>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});