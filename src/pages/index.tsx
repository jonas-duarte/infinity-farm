import type { NextPage } from "next";
import Head from "next/head";
import { Game } from "../components/Game";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Infinity Garden</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Game />
    </div>
  );
};

export default Home;
