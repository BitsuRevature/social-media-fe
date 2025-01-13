import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Discover from '../../pages/Discover';
import {
  CssVarsProvider,
} from "@mui/joy";
import { testPostStore } from '../testMocks'
import { assert } from 'vitest';

describe('Discover Page', () => {
  it('renders Discover page and does not crash', () => {
    const renderContainer = () => render(
      <CssVarsProvider>
      <Provider store={testPostStore}>
        <Router>
          <Discover />
        </Router>
      </Provider>
      </CssVarsProvider>
    );
    assert.doesNotThrow(renderContainer);
  });
});
