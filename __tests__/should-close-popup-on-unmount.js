import React from 'react';
import renderer, { act } from 'react-test-renderer';
import OauthPopup from '../src/index';

test('OauthPopup closes popup on unmount', () => {
  let component;
  const close = jest.fn();
  global.open = jest.fn().mockReturnValue({
    location: {
      href: 'http://www.google.com',
    },
    close,
  });
  act(() => {
    component = renderer.create(
        <OauthPopup>
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
  expect(global.open.mock.calls.length).toBe(1);
  act(() => {
    component.unmount();
  });
  expect(close.mock.calls.length).toBe(1);
  expect(global.open.mock.calls.length).toBe(1);
});
