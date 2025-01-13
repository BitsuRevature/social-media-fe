import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import BalayHubLogo from '../../components/BalayHubLogo';
import {
  CssVarsProvider,
} from "@mui/joy";
import { testStore } from '../testMocks'
import { assert } from 'vitest';

describe('BalayHub component', () => {
  const renderContainer = () => render(
        <CssVarsProvider>
        <Provider store={testStore}>
          <Router>
            <BalayHubLogo />
          </Router>
        </Provider>
        </CssVarsProvider>
      );

  it('renders BalayHubLogo and does not crash', () => {
    assert.doesNotThrow(renderContainer);
  })

  it('displays the name of the app', () => {
    renderContainer();
    const pc = document.querySelector("[data-testid=BHLogoText]");
    expect(pc!.textContent).toBe("Balay Hub");
  })
  
});