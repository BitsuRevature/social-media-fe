import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import FollowingConnections from '../../components/FollowingConnections';
import {
  CssVarsProvider,
} from "@mui/joy";
import { testStore } from '../testMocks'
import { assert } from 'vitest';

describe('Search Bar', () => {
  it('renders FollowingConnections component and does not crash', () => {
    const renderContainer = () => render(
      <CssVarsProvider>
      <Provider store={testStore}>
        <Router>
         <Routes>
             <Route element={<Outlet context={{search: ""}} />}>
                 <Route element={<FollowingConnections />} />
             </Route>
         </Routes>
        </Router>
      </Provider>
      </CssVarsProvider>
    );
    assert.doesNotThrow(renderContainer);
  });
});
