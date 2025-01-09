import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import {
  CssVarsProvider,
} from "@mui/joy";


  
  describe('Protected route', () => {
    it('does not render without user info from auth store', () => {

        const preloadedState = {
            uth: null
            }
        const testStore = configureStore({
            reducer: ()=>null,
            preloadedState, 
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

        const preloadedState = {
            auth: {
              auth: {
                token: null,
                id: null,
                username: null,
                profilePicture: null,
                bio: null,
                firstname: "test",
                lastname:  "testerson",
                exipreDate: undefined
              },
              isLoading: false, 
            },
          };
          
          const testStore = configureStore({
            reducer: {
              auth: authReducer,
            },
            preloadedState, 
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
  