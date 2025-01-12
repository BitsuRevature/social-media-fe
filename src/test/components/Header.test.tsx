import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../../components/Header';
import {
  CssVarsProvider,
} from "@mui/joy";
import { testStore } from '../testMocks'
import { assert } from 'vitest';

describe('Search Bar', () => {
  it('renders header and does not crash', () => {
    const renderContainer = () => render(
      <CssVarsProvider>
      <Provider store={testStore}>
        <Router>
          <Header />
        </Router>
      </Provider>
      </CssVarsProvider>
    );
    assert.doesNotThrow(renderContainer);
  });
});
