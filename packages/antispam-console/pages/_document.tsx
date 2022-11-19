import { ColorModeScript } from "@chakra-ui/react";
import {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentProps,
} from "next/document";

export default function Document({ locale, head }: DocumentProps) {
  return (
    <Html lang={locale ?? "en"}>
      <Head />
      <body>
        <ColorModeScript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
