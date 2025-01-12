import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import FollowButton from '../../components/FollowButton';
import {
  CssVarsProvider,
} from "@mui/joy";
import { testStore, mockUser } from '../testMocks'
import { assert } from 'vitest';

describe('Search Bar', () => {
  it('renders FollowButton component and does not crash', () => {
    const renderContainer = () => render(
      <CssVarsProvider>
      <Provider store={testStore}>
        <Router>
          <FollowButton connection={mockUser}/>
        </Router>
      </Provider>
      </CssVarsProvider>
    );
    assert.doesNotThrow(renderContainer);
  });
});
