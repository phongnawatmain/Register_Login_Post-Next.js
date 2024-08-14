import '../styles/globals.css'; // นำเข้าไฟล์ globals.css จากโฟลเดอร์ styles

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
