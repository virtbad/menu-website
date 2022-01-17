import Document, { Head, Html, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  render(): JSX.Element {
    const theme: string = `
    var isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (localStorage.theme !== "system")
      document.documentElement.setAttribute("theme", localStorage.theme);
    else document.documentElement.setAttribute("theme", isSystemDark ? "dark" : "light");
    `;

    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"anonymous"} />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <script id="theme-initializer" dangerouslySetInnerHTML={{ __html: theme }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
