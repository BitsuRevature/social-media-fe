import { CssVarsProvider } from "@mui/joy";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { assert, vi } from "vitest";
import SearchBar from "../../components/SearchBar";
import { testStore } from "../testMocks";

describe("Search Bar", () => {
  const renderComponent = () => {
    const onChange = vi.fn();
    render(
      <CssVarsProvider>
        <Provider store={testStore}>
          <Router>
            <SearchBar onChange={onChange} />
          </Router>
        </Provider>
      </CssVarsProvider>
    );

    return {
      onChange,
      input: screen.getByPlaceholderText(/search/i),
      user: userEvent.setup(),
    };
  };

  it("renders searchbar and does not crash", () => {
    const renderContainer = () =>
      render(
        <CssVarsProvider>
          <Provider store={testStore}>
            <Router>
              <SearchBar onChange={() => console.log("change fn")} />
            </Router>
          </Provider>
        </CssVarsProvider>
      );
    assert.doesNotThrow(renderContainer);
  });

  it("should render a searchBox", () => {
    const { input } = renderComponent();
    expect(input).toBeInTheDocument();
  });

  // it("should NOT call onChange callback when enter is pressed with no input", async () => {
  //   const { input, onChange, user } = renderComponent();

  //   await user.type(input, "{Enter}");
  //   expect(onChange).not.toHaveBeenCalled();
  // });

  // it("should call onChange callback when enter is pressed", async () => {
  //   const { input, onChange, user } = renderComponent();

  //   const searchTerm = "Search by this";
  //   await user.type(input, `${searchTerm}{Enter}`);
  //   expect(onChange).toHaveBeenCalledWith(searchTerm);
  // });
});
