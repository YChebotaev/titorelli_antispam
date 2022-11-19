import { ColorModeScript } from "@chakra-ui/react";
import {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentProps,
} from "next/document";

export default function Document({ locale }: DocumentProps) {
  return (
    <Html lang={locale ?? "en"}>
      <Head>
        <link rel="icon" href="favicon.svg" />
        <meta name="theme-color" content="#6667AB" />
      </Head>
      <body>
        <ColorModeScript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
