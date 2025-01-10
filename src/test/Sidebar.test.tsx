import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import {
  CssVarsProvider,
} from "@mui/joy";
import { testStore } from './testMocks';

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
