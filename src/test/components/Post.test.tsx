import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Post from '../../components/Post';
import {
  CssVarsProvider,
} from "@mui/joy";
import { testStore, mockPost } from '../testMocks'

describe('Post component', () => {
  it('renders post component with supplied mock data', () => {
    render(
      <CssVarsProvider>
      <Provider store={testStore}>
        <Router>
          <Post post={mockPost}/>
        </Router>
      </Provider>
      </CssVarsProvider>
    );
    const pc = document.querySelector("[data-testid=postContent]");
    expect(pc!.textContent).toBe("mock post content");
  });
});
