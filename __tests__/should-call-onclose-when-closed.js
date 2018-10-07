import React from 'react';
import renderer from 'react-test-renderer';
import OauthPopup from "../src/index.js";

test('OauthPopup calls onClose when popup closed', done => {
    global.open = jest.fn().mockReturnValue({
        location: "http://www.google.com",
        close: function(){
            this.onbeforeunload()
        }
    });
    const mockOnClose =  jest.fn();
    const component = renderer.create(
        <OauthPopup
            onClose={() => {
                mockOnClose()
                done()
            }}
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
    component.unmount();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
});
