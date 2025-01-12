import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Feed from '../../pages/Feed';
import {
  CssVarsProvider,
} from "@mui/joy";
import { testPostStore } from '../testMocks'
import { assert } from 'vitest';

describe('Feed Page', () => {
  it('renders Feed page and does not crash', () => {
    const renderContainer = () => render(
      <CssVarsProvider>
      <Provider store={testPostStore}>
        <Router>
          <Feed />
        </Router>
      </Provider>
      </CssVarsProvider>
    );
    assert.doesNotThrow(renderContainer);
  });
});
