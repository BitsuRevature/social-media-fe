import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: "#ffffff",
          surface: "#f9f9f9",
        },
        text: {
          primary: "#000000",
          secondary: "#666666",
        },
      },
    },
    dark: {
      palette: {
        background: {
          body: "#121212",
          surface: "#1e1e1e",
        },
        text: {
          primary: "#ffffff",
          secondary: "#bbbbbb",
        },
      },
    },
  },
});

export default theme;
