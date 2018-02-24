import React from 'react';
import renderer from 'react-test-renderer';
import OauthPopup from "../src/index.js";

test('OauthPopup closes popup on unmount', () => {
    const close = jest.fn()
    global.open = jest.fn().mockReturnValue({
        location: "http://www.google.com",
        close,
    });
    const component = renderer.create(
        <OauthPopup>
            <div>coooooooool</div>
            <h2>siiiiiiiick</h2>
            <h2>leeegiiiiit</h2>
            <button>Doooooope</button>
        </OauthPopup>
    );
    let popup = component.toJSON();
    expect(popup).toMatchSnapshot();
    popup.props.onClick();
    popup = component.toJSON();
    expect(global.open.mock.calls.length).toBe(1);
    component.unmount();
    expect(close.mock.calls.length).toBe(1);
    expect(global.open.mock.calls.length).toBe(1);
});