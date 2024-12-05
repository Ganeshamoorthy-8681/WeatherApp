import { createTheme, responsiveFontSizes, ThemeProvider, CssBaseline } from "@mui/material";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

let theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "3rem", // Desktop: 48px
      fontWeight: 700,
      lineHeight: 1.2,
      "@media (max-width:1200px)": {
        fontSize: "2.5rem", // Tablet: 40px
      },
      "@media (max-width:768px)": {
        fontSize: "2rem", // Mobile: 32px
      },
      "@media (max-width:480px)": {
        fontSize: "1.75rem", // Small Mobile: 28px
      },
    },
    h2: {
      fontSize: "2.5rem", // Desktop: 40px
      fontWeight: 600,
      lineHeight: 1.3,
      "@media (max-width:1200px)": {
        fontSize: "2rem", // Tablet: 32px
      },
      "@media (max-width:768px)": {
        fontSize: "1.75rem", // Mobile: 28px
      },
      "@media (max-width:480px)": {
        fontSize: "1.5rem", // Small Mobile: 24px
      },
    },
    h3: {
      fontSize: "2rem", // Desktop: 32px
      fontWeight: 500,
      lineHeight: 1.4,
      "@media (max-width:1200px)": {
        fontSize: "1.75rem", // Tablet: 28px
      },
      "@media (max-width:768px)": {
        fontSize: "1.5rem", // Mobile: 24px
      },
    },
    h4: {
      fontSize: "1.75rem", // Desktop: 28px
      fontWeight: 500,
      lineHeight: 1.4,
      "@media (max-width:1200px)": {
        fontSize: "1.5rem", // Tablet: 24px
      },
      "@media (max-width:768px)": {
        fontSize: "1.25rem", // Mobile: 20px
      },
    },
    h5: {
      fontSize: "1.5rem", // Desktop: 24px
      fontWeight: 400,
      lineHeight: 1.5,
      "@media (max-width:1200px)": {
        fontSize: "1.25rem", // Tablet: 20px
      },
    },
    h6: {
      fontSize: "1.25rem", // Desktop: 20px
      fontWeight: 400,
      lineHeight: 1.6,
      "@media (max-width:1200px)": {
        fontSize: "1rem", // Tablet: 16px
      },
    },
    body1: {
      fontSize: "1rem", // Desktop: 16px
      lineHeight: 1.5,
      "@media (max-width:768px)": {
        fontSize: "0.8rem", // Mobile: 14px
      },
    },
    body2: {
      fontSize: "0.875rem", // Desktop: 14px
      lineHeight: 1.5,
      "@media (max-width:768px)": {
        fontSize: "0.8rem", // Mobile: 13px
      },
    },
    subtitle1: {
      fontSize: "1rem", // Desktop: 16px
      fontWeight: 400,
      "@media (max-width:768px)": {
        fontSize: "0.875rem", // Mobile: 14px
      },
    },
    subtitle2: {
      fontSize: "0.875rem", // Desktop: 14px
      fontWeight: 400,
      "@media (max-width:768px)": {
        fontSize: "0.8rem", // Mobile: 13px
      },
    },
    button: {
      fontSize: "0.875rem", // Desktop: 14px
      textTransform: "uppercase",
      fontWeight: 500,
      "@media (max-width:768px)": {
        fontSize: "0.8rem", // Mobile: 13px
      },
      "@media (max-width:480px)": {
        fontSize: "0.75rem", // Small Mobile: 12px
      },
    },
  },
});

// Wrap the application with the ThemeProvider
theme = responsiveFontSizes(theme);

export default function ThemeContext(props: {
  children:
    | string
    | number
    | boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}
