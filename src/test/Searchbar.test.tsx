import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import {
  CssVarsProvider,
} from "@mui/joy";
import { testStore } from './testMocks'

describe('Post component', () => {
  it('renders searchbar and does not crash', () => {
    render(
      <CssVarsProvider>
      <Provider store={testStore}>
        <Router>
          <SearchBar onChange={()=>console.log("change fn")}/>
        </Router>
      </Provider>
      </CssVarsProvider>
    );
  });
});
