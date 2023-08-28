import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";



export default class MyDocument extends Document {
  

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="I'm EduExtreme, I'm Front-end developer."
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="EduExtreme - Front-end Design" />
          <meta />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
