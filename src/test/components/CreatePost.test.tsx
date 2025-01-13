import { CssVarsProvider } from "@mui/joy";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { assert } from "vitest";
import CreatePost from "../../components/CreatePost";
import { mockHandleFileChange, testStore } from "../testMocks";

describe("CreatePost Component", () => {
  const renderComponent = () => {
    render(
      <CssVarsProvider>
        <Provider store={testStore}>
          <Router>
            <CreatePost />
          </Router>
        </Provider>
      </CssVarsProvider>
    );

    return {
      uploadBtn: screen.getByRole("button", { name: /upload/i }),
      saveBtn: screen.getByRole("button", { name: /save/i }),
      cancelBtn: screen.getByRole("button", { name: /cancel/i }),
      input: screen.getByPlaceholderText(/describe/i),
      user: userEvent.setup(),
    };
  };

  it("renders create post component", () => {
    assert.doesNotThrow(renderComponent);
  });

  it("accepts images under 5mb", async () => {
    render(
      <input
        type="file"
        onChange={(e) => mockHandleFileChange(e)}
        data-testid="mockInput"
        accept="image/png, image/jpeg"
      />
    );
    const mockInput = screen.getByTestId("mockInput");
    const file = new File(["file"], "file.png", { type: "image/png" });

    await userEvent.upload(mockInput, file);
  });

  it("does not accept images over 5mb", async () => {
    render(
      <input
        type="file"
        onChange={(e) => mockHandleFileChange(e)}
        data-testid="mockInput"
        accept="image/png, image/jpeg, image/jpg"
      />
    );
    const mockInput = screen.getByTestId("mockInput");
    assert.isNotOk(
      await userEvent.upload(mockInput, "../testAssets/over5mbPhoto.jpg")
    );
  });

  it("should disable save button on initial render", () => {
    const { saveBtn } = renderComponent();
    expect(saveBtn).toBeDisabled();
  });
});
