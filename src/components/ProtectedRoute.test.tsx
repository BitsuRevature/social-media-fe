import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import {
  CssVarsProvider,
} from "@mui/joy";


const preloadedState = {
    auth: null
    }
  const testStore = configureStore({
    reducer: ()=>null,
    preloadedState, 
  });

  
  describe('Protected route', () => {
    it('does not render without user info from auth store', () => {
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
  });
  