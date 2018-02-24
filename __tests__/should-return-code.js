import React from 'react';
import renderer from 'react-test-renderer';
import OauthPopup from "../src/index.js";

test('OauthPopup returns code when present in popupurl', done => {
    const mockCallBack = (code) => {
        expect(code).toBe('amazing')
        done();
    };

    global.open = jest.fn().mockReturnValue({
        location: "http://www.google.com?code=amazing"
    });

    const component = renderer.create(
        <OauthPopup
            onCode={mockCallBack}
        >
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
    expect(popup).toMatchSnapshot();
    expect(global.open).toBeCalled();
});