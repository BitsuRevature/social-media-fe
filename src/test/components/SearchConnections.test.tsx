import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import SearchConnections from '../../components/SearchConnections';
import {
  CssVarsProvider,
} from "@mui/joy";
import { testStore } from '../testMocks'
import { assert } from 'vitest';

describe('Search Connections', () => {
  it('renders SearchConnections component and does not crash', () => {
    const renderContainer = () => render(
      <CssVarsProvider>
      <Provider store={testStore}>
        <Router>
         <Routes>
             <Route element={<Outlet context={{search: ""}} />}>
                 <Route element={<SearchConnections />} />
             </Route>
         </Routes>
        </Router>
      </Provider>
      </CssVarsProvider>
    );
    assert.doesNotThrow(renderContainer);
  });
});
