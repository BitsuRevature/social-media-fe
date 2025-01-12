import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from '../../pages/SignIn';
import {
  CssVarsProvider,
} from "@mui/joy";
import { testStore } from '../testMocks'
import { assert } from 'vitest';
import { userEvent } from '@vitest/browser/context';

describe('Sign In Page', () => {
    const renderContainer = () => render(
        <CssVarsProvider>
        <Provider store={testStore}>
          <Router>
            <SignIn />
          </Router>
        </Provider>
        </CssVarsProvider>
      );
  it('renders Sign In page and does not crash', () => {
    assert.doesNotThrow(renderContainer);
  });

  it('requires username and password', () => {
    renderContainer();
    const submitBtn = screen.getByTestId("testSubmitBtn");
    console.log(submitBtn)
  })
});
