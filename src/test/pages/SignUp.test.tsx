import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from '../../pages/SignIn';
import {
  CssVarsProvider,
} from "@mui/joy";
import { testStore } from '../testMocks'
import { assert } from 'vitest';

describe('Sign Up', () => {
  it('renders Sign Up page and does not crash', () => {
    const renderContainer = () => render(
      <CssVarsProvider>
      <Provider store={testStore}>
        <Router>
          <SignIn />
        </Router>
      </Provider>
      </CssVarsProvider>
    );
    assert.doesNotThrow(renderContainer);
  });
});
