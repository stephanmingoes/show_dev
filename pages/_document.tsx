import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content="Show_Dev" />
        <meta
          name="description"
          content="A community for developers to share, showcase, and promote their work, gain inspiration, and find opportunities to collaborate and grow"
        />
        <meta
          name="keywords"
          content="show_dev, sofware projects, computer science, web developer, software developer"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English"></meta>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
