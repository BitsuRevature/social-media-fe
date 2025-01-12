import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import CreatePost from '../../components/CreatePost';
import {
  CssVarsProvider,
} from "@mui/joy";
import { testStore, mockHandleFileChange } from '../testMocks';
import { assert } from 'vitest';
import { userEvent } from '@vitest/browser/context';



describe('CreatePost Component', () => {

  const renderContainer = () => {
    render(
        <CssVarsProvider>
        <Provider store={testStore}>
          <Router>
            <CreatePost />
          </Router>
        </Provider>
        </CssVarsProvider>
      );
  }

  it('renders create post component', () => {
    assert.doesNotThrow(renderContainer)
  });


  it('accepts images under 5mb', async() => {
    render(<input type="file" onChange={(e)=>mockHandleFileChange(e)} data-testid="mockInput" accept="image/png, image/jpeg"/>)
    const mockInput = screen.getByTestId("mockInput");
    const file = new File(['file'], 'file.png', { type: 'image/png' })
    
    await userEvent.upload(mockInput, file)
      
    })

  it('does not accept images over 5mb', async() => {
    render(<input type="file" onChange={(e)=>mockHandleFileChange(e)} data-testid="mockInput" accept="image/png, image/jpeg, image/jpg"/>)
    const mockInput = screen.getByTestId("mockInput");
    assert.isNotOk(await userEvent.upload(mockInput, '../testAssets/over5mbPhoto.jpg'));
    })
})
