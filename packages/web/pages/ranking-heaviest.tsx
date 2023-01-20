import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import styles from "../styles/Ranking.module.css";
import { Airplane } from "./api/airplane.interface";
import { renderAirplane } from "../components/airplane.card";

const RankingHeaviest = ({ ranking }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Aviões na Web - aviões mais pesados</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Top 10 heaviest planes</h1>
        <section>
          {ranking.map((airplane: Airplane, index) =>
            renderAirplane(airplane, index, "emptyWeight")
          )}
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(`http://localhost:8080/v1/airplanes/heaviest`);
  const ranking: Airplane[] = await res.json();

  return { props: { ranking } };
};

export default RankingHeaviest;
