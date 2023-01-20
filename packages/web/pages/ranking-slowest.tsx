import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import styles from "../styles/Ranking.module.css";
import { Airplane } from "./api/airplane.interface";
import { renderAirplane } from "../components/airplane.card";

const RankingSlowest = ({ ranking }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Aviões na Web - aviões mais lentos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Bottom 10 slowest planes</h1>
        <section>
          {ranking.map((airplane: Airplane, index) =>
            renderAirplane(airplane, index, "maximumSpeed")
          )}
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(`http://localhost:8080/v1/airplanes/slowest`);
  const ranking: Airplane[] = await res.json();
  return { props: { ranking } };
};

export default RankingSlowest;
