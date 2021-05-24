import Layout from "../../components/Layout";
import styles from "./Coin.module.css";

function CoinDetail({ coin }) {
  return (
    <Layout>
      <div className={styles.coin_page}>
        <div className={styles.coin_container}>
          <img
            src={coin.image.large}
            alt={coin.name}
            className={styles.coin_image}
          />
          <h1 className={styles.coin_name}>{coin.name}</h1>
          <p className={styles.coin_ticker}>{coin.symbol}</p>
          <p className={styles.coin_current}>
            ₹{coin.market_data.current_price.inr}
          </p>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { params } = context;

  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${params.id}`
  );
  const coin = await res.json();
  return {
    props: { coin },
  };
};

export default CoinDetail;
