import React from 'react';
import renderer, { act } from 'react-test-renderer';
import OauthPopup from '../src/index';

test('OauthPopup calls onClose when popup closed', () => {
  let component;
  const mockOnClose = jest.fn();
  global.open = jest.fn().mockReturnValue({
    location: {
      href: 'http://www.google.com',
    },
    close: mockOnClose,
  });
  act(() => {
    component = renderer.create(
            <OauthPopup
                onClose={() => {}}
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
  act(() => {
    component.unmount();
  });
  expect(mockOnClose).toHaveBeenCalledTimes(1);
});
