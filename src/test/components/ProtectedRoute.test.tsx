import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import { configureStore } from '@reduxjs/toolkit';
import {
  CssVarsProvider,
} from "@mui/joy";
import { testStore } from '../testMocks';

  
  describe('Protected route', () => {
    it('does not render without user info from auth store', () => {
        const emptyStore = configureStore({
            reducer: ()=>null,
            preloadedState: {}, 
        }); 

      expect(() => render(
          <CssVarsProvider>
            <Provider store={emptyStore}>
              <Router>
                <ProtectedRoute />
              </Router>
            </Provider>
          </CssVarsProvider>
        )).toThrow();
    });

    it('renders a protected route with valid user info from auth store', () => {
        render(
            <CssVarsProvider>
              <Provider store={testStore}>
              <Router>
                  <ProtectedRoute />
              </Router>
              </Provider>
            </CssVarsProvider>
        )
        const fn_ln = document.querySelector("[data-testid=fn_ln]");
        expect(fn_ln!.textContent).toBe("test testerson");
    });
  });
  