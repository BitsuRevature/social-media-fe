import { CssVarsProvider } from "@mui/joy";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Post from "../../components/Post";
import { mockPost, testStore } from "../testMocks";

describe("Post component", () => {
  const renderComponent = () => {
    render(
      <CssVarsProvider>
        <Provider store={testStore}>
          <Router>
            <Post post={mockPost} />
          </Router>
        </Provider>
      </CssVarsProvider>
    );

    return {
      user: userEvent.setup(),
      addIcon: screen.getByTestId("AddRoundedIcon"),
      likeIcon: screen.getByTestId("FavoriteIcon"),
      removeIcon: screen.findByTestId("RemoveIcon"),
      commentInput: screen.findByPlaceholderText(/new comment/i),
      addComment: screen.findByRole("button", { name: /add comment/i }),
    };
  };

  it("renders post component with supplied mock data", () => {
    renderComponent();
    const pc = document.querySelector("[data-testid=postContent]");
    expect(pc!.textContent).toBe("mock post content");
  });

  it("should render all the post interaction actions", () => {
    const { addIcon, likeIcon } = renderComponent();
    expect(addIcon).toBeInTheDocument();
    expect(likeIcon).toBeInTheDocument();
  });

  it("should open up the comment input box and change add icon to remove icon when add icon is clicked", async () => {
    const { user, addIcon, commentInput, removeIcon } = renderComponent();
    user.click(addIcon);
    const commentBox = await commentInput;
    const removeAction = await removeIcon;

    expect(commentBox).toBeInTheDocument();
    expect(removeAction).toBeInTheDocument();
  });

  it("should not allow user to add an empty comment", async () => {
    const { user, addIcon, commentInput, addComment } = renderComponent();
    user.click(addIcon);
    const commentBox = await commentInput;
    const addBtn = await addComment;
    expect(addBtn).toBeInTheDocument();
    user.click(addBtn);
    expect(commentBox).toBeInTheDocument();
  });
});
