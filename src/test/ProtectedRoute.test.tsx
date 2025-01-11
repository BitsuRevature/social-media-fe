import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import {
  CssVarsProvider,
} from "@mui/joy";
import { preloadedState as mockUserState } from './testMocks';

  
  describe('Protected route', () => {
    it('does not render without user info from auth store', () => {

        const testStore = configureStore({
            reducer: ()=>null,
            preloadedState: {}, 
        }); 

    expect(() => render(
        <CssVarsProvider>
          <Provider store={testStore}>
            <Router>
              <ProtectedRoute />
            </Router>
          </Provider>
        </CssVarsProvider>
      )).toThrow();
    });

    it('renders a protected route with valid user info from auth store', () => {
          const testStore = configureStore({
            reducer: {
              auth: authReducer,
            },
            preloadedState: mockUserState, 
          });

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
  