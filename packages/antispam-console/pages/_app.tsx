import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { ProtectedShell } from "../components";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider>
          <SessionProvider session={pageProps.session}>
            <ProtectedShell isDisabled={(Reflect.get(Component, 'protected') as boolean) === false}>
              <Component {...pageProps} />
            </ProtectedShell>
          </SessionProvider>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
