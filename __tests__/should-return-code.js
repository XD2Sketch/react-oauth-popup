import React from 'react';
import renderer, { act } from 'react-test-renderer';
import OauthPopup from '../src/index';

test('OauthPopup returns code when present in popupurl', (done) => {
  let component;
  const mockCallBack = (code) => {
    expect(code).toBe('amazing');
    done();
  };

  global.open = jest.fn().mockReturnValue({
    location: {
      href: 'http://www.google.com?code=amazing',
    },
  });

  act(() => {
    component = renderer.create(
            <OauthPopup
                onCode={mockCallBack}
            >
                <div>coooooooool</div>
                <h2>siiiiiiiick</h2>
                <h2>leeegiiiiit</h2>
                <button>Doooooope</button>
            </OauthPopup>,
    );
  });
  let popup = component.toJSON();
  expect(popup).toMatchSnapshot();
  act(() => {
    popup.props.onClick();
  });
  popup = component.toJSON();
  expect(popup).toMatchSnapshot();
  expect(global.open).toBeCalled();
});
