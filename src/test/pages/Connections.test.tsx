import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Connections from '../../pages/Connections';
import {
  CssVarsProvider,
} from "@mui/joy";
import { testStore } from '../testMocks'
import { assert } from 'vitest';

describe('Search Bar', () => {
  it('renders connections page and does not crash', () => {
    const renderContainer = () => render(
      <CssVarsProvider>
      <Provider store={testStore}>
        <Router>
          <Connections />
        </Router>
      </Provider>
      </CssVarsProvider>
    );
    assert.doesNotThrow(renderContainer);
  });
});
