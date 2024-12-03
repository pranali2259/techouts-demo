import { ResponseProvider } from "@/contex/Contex";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return  <ResponseProvider>
  <Component {...pageProps} />
</ResponseProvider>
}
