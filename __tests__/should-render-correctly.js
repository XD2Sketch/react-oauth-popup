import React from 'react';
import renderer, { act } from 'react-test-renderer';
import OauthPopup from '../src/index';

test('OauthPopup component renders correctly', () => {
  let tree;
  act(() => {
    tree = renderer.create(
            <OauthPopup>
                <div>coooooooool</div>
                <h2>siiiiiiiick</h2>
                <h2>leeegiiiiit</h2>
                <button>Doooooope</button>
            </OauthPopup>,
    );
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
