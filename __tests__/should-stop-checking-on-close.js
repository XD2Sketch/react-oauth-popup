import React from 'react';
import renderer, { act } from 'react-test-renderer';
import OauthPopup from '../src/index';

jest.useFakeTimers('legacy');

test('OAuthPopup stops checking for code when popup closes', () => {
  let component;
  const mockCallBack = jest.fn();
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
  act(() => {
    jest.runAllTimers();
  });
  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(clearInterval).toHaveBeenCalledTimes(1);
  expect(mockCallBack).toHaveBeenCalledTimes(1);
});
