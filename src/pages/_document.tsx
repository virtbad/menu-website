import createCache from "@emotion/cache";
import createEmotionServer from "@emotion/server/create-instance";
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";
import React from "react";

/**
 * Create a new cache for the emotion css
 */

export const createEmotionCache = () => {
  return createCache({ key: "css", prepend: true });
};

/**
 * Default layout of the DOM
 */

export default class CustomDocument extends Document {
  public static async getInitialProps(context: DocumentContext): Promise<DocumentInitialProps> {
    // handle css for ssr and build

    const originalRenderPage = context.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    context.renderPage = () => originalRenderPage({ enhanceApp: (App: any) => (props) => <App emotionCache={cache} {...props} /> });

    const initialProps = await Document.getInitialProps(context);

    const emotionStyle = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyle.styles.map((style) => <style data-emotion={`${style.key} ${style.ids.join(" ")}`} key={style.key} dangerouslySetInnerHTML={{ __html: style.css }} />);

    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
    };
  }

  render() {
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
          <section style={{ height: "0px" }}>
            <svg height={"0px"} width={"0px"}>
              <defs>
                <linearGradient id="background-gradient" gradientTransform="rotate(0)">
                  <stop offset="12%" stopColor="#2c9112" />
                  <stop offset="100%" stopColor="#047a0e" />
                </linearGradient>
              </defs>
            </svg>
          </section>
        </body>
      </Html>
    );
  }
}
