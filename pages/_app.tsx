import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StoreProvider } from "easy-peasy";
import { NextPage } from "next";
import { AppProps } from "next/app";
import "reset-css";
import PlayerLayout from "../components/playerLayout";
import { store } from "../lib/store";

const theme = extendTheme({
  colors: {
    gray: {
      100: "#F5f5f5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ":focus": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

type Page<P = object> = NextPage<P> & {
  excludeLayout?: string;
};

type Props = AppProps & {
  Component: Page;
};

const MyApp = ({ Component, pageProps }: Props) => {
  return (
    <ChakraProvider theme={theme}>
      {Component.excludeLayout ? (
        <Component {...pageProps} />
      ) : (
        <StoreProvider store={store}>
          <PlayerLayout>
            <Component {...pageProps} />
          </PlayerLayout>
        </StoreProvider>
      )}
    </ChakraProvider>
  );
};

export default MyApp;
