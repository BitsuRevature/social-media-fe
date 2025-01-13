import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/authSlice';
import SignIn from '../../pages/SignIn';
import {
  CssVarsProvider,
} from "@mui/joy";
import { assert } from 'vitest';
import { userEvent } from '@vitest/browser/context';

describe('Sign In Page', () => {

    const emptyStore = configureStore({
        reducer: authReducer,
        preloadedState: {auth: null,
            isLoading: false}, 
    }); 

    const renderContainer = () => render(
        <CssVarsProvider>
        <Provider store={emptyStore}>
          <Router>
            <SignIn />
          </Router>
        </Provider>
        </CssVarsProvider>
      );
  it('renders Sign In page and does not crash', () => {
    assert.doesNotThrow(renderContainer);
  });

  it('will not allow submit without username and password', async() => {
    renderContainer();
    const submitBtn = screen.getByTestId("testSubmitBtn") as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);
    });

  it('will allow submit with username and password', async() => {
    renderContainer();
    const submitBtn = screen.getByTestId("testSubmitBtn") as HTMLButtonElement;
    const username = screen.getByTestId("testUserName").firstChild as HTMLInputElement;
    const password = screen.getByTestId("testPassword").firstChild as HTMLInputElement;
    await act(async() => userEvent.fill(username, "testuser99")); 
    await act(async() => userEvent.fill(password, "password")); 
    expect(submitBtn.disabled).toBe(false);
    });
})

