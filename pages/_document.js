import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html dir="rtl">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/style/globals.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
