import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import EditProfile from '../../components/EditProfile';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/authSlice';
import {
  CssVarsProvider,
} from "@mui/joy";
import { preloadedState as mockUserState, testStore } from '../testMocks';
import { assert } from 'vitest';

describe('Edit Profile', () => {
      const renderContainer = () => render(
        <CssVarsProvider>
            <Provider store={testStore}>
                <Router>
                <EditProfile />
                </Router>
            </Provider>
        </CssVarsProvider>
        );

    it('renders EditProfile component and does not crash', () => {
        assert.doesNotThrow(renderContainer);
    });
    it('contains mock user info', () => {
        renderContainer();
        const el = screen.getByDisplayValue("testuser");
        assert.isOk(el);
    })
});