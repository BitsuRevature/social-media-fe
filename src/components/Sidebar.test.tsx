import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Sidebar';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import {
  CssVarsProvider,
} from "@mui/joy";


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

describe('Sidebar Component', () => {
  it('renders sidebar with user first and last name', () => {
    render(
      <CssVarsProvider>
      <Provider store={testStore}>
        <Router>
          <Sidebar />
        </Router>
      </Provider>
      </CssVarsProvider>
    );
    const fn_ln = document.querySelector("[data-testid=fn_ln]");
    expect(fn_ln!.textContent).toBe("test testerson");
  });
});
