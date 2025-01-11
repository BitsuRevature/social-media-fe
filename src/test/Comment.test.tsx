import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Comment from '../components/Comment';
import {
  CssVarsProvider,
} from "@mui/joy";
import { testStore, mockPost, mockComment } from './testMocks';
import { assert } from 'vitest';

describe('Comment Component', () => {
    const renderContainer = () => render(
        <CssVarsProvider>
        <Provider store={testStore}>
          <Router>
            <Comment postId={mockPost.id} comment={mockComment}/>
          </Router>
        </Provider>
        </CssVarsProvider>
      );

    it('renders comment component', () => {
        assert.doesNotThrow(renderContainer)
    });

    it('renders with comment text', () => {
        renderContainer();
        const el = screen.getByText(mockComment.content);
        assert.isOk(el);
        expect(el.textContent).toBe("test comment")
    })

});
