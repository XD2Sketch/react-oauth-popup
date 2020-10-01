import React from 'react';
import renderer, { act } from 'react-test-renderer';
import OauthPopup from '../src/index';

test('OauthPopup does not return a code when non is present', (done) => {
  let component;
  const mockCallBack = jest.fn();
  global.open = jest.fn().mockReturnValue({
    location: {
      href: 'http://www.google.com',
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
  expect(mockCallBack).not.toBeCalled();
  setTimeout(done, 50);
});
