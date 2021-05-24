import { useState } from "react";
import Head from "next/head";
import CoinList from "../components/CoinList";
import SearchBar from "../components/SearchBar";
import Layout from "../components/Layout";

export default function Home({ filteredCoins }) {
  const [searchInput, setSearchInput] = useState("");

  const allCoins = filteredCoins.filter((coin) =>
    coin.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleChange = (e) => {
    e.preventDefault();

    setSearchInput(e.target.value.toLowerCase());
  };
  return (
    <Layout>
      <Head>
        <title>Crypto Tracker</title>
        <meta name="description" content="Crypto Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="coin_app">
        <SearchBar type="text" placeholder="Search" onChange={handleChange} />
        <CoinList filteredCoins={allCoins} />
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=50&page=1&sparkline=false"
  );
  const filteredCoins = await res.json();

  return {
    props: {
      filteredCoins,
    },
  };
};
