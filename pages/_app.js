import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-primary min-h-screen">
      <Component {...pageProps} />
    </div>
  );
}
