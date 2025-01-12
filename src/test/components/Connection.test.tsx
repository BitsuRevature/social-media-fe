import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Connection from '../../components/Connection';
import {
  CssVarsProvider,
} from "@mui/joy";
import { testStore, mockUser } from '../testMocks'
import { assert } from 'vitest';

describe('Search Bar', () => {
  it('renders Connection component and does not crash', () => {
    const renderContainer = () => render(
      <CssVarsProvider>
      <Provider store={testStore}>
        <Router>
          <Connection connection={mockUser}/>
        </Router>
      </Provider>
      </CssVarsProvider>
    );
    assert.doesNotThrow(renderContainer);
  });
});
