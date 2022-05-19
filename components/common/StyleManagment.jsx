import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Rtl } from "./Rtl";
const theme = createTheme({
  palette: {
    // type: "light",
    primary: {
      main: "#3772ff",
    },
    secondary: {
      main: "#df2935",
      light: "#fa5156",
    },
    background: {
      default: "#e6e8e6",
      paper: "#ffffff",
    },
    text: {
      primary: "#080708",
      secondary: "rgba(8,7,8,0.33)",
      disabled: "rgba(8,7,8,0.33)",
      hint: "rgba(8,7,8,0.33)",
    },
    error: {
      main: "#df2935",
      light: "#fa5156",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2176ff",
    },
    success: {
      main: "#0ead69",
    },
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: "#689f38",
        color: "#fff",
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          paddingRight: "50px",
          paddingLeft: "50px",
        },
      },
    },
  },
  direction: "rtl",
  props: {
    MuiAppBar: {
      color: "inherit",
    },
    MuiTooltip: {
      arrow: true,
    },
  },
});
export const StyleManagment = (props) => {
  return (
    <Rtl>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </Rtl>
  );
};
