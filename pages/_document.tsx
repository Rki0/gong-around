import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

function googleMapCallback() {}

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          // src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&libraries=places&callback=${googleMapCallback}`}
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </Head>
      <body>
        <div id="modal"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
