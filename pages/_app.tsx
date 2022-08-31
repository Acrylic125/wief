import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-base-dark dark:bg-dark-base-dark">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
