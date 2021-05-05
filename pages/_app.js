import "../styles/globals.css";

import { ContextProvider } from "../store/ContextProvider";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export default function App({ Component, pageProps }) {
	return (
		<ContextProvider>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</ContextProvider>
	);
}
