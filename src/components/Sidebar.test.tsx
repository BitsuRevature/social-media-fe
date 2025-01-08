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
      firstname: null,
      lastname:  null,
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
  it('renders without crashing', () => {
    const { container } = render(
      <CssVarsProvider>
      <Provider store={testStore}>
        <Router>
          <Sidebar />
        </Router>
      </Provider>
      </CssVarsProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
