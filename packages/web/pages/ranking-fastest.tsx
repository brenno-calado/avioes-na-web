import { InferGetServerSidePropsType } from "next";
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import styles from "../styles/Ranking.module.css";
import Link from "next/link";

type Airplane = {
  Title: string;
  "Maximum speed": string;
  Image: string;
  Source: string;
};

const renderAirplane = (airplane: Airplane, index: number) => {
  return (
    <div key={index} className={styles.card}>
      <h2>{index + 1}º</h2>
      {
        <Image
          src={airplane.Image ? airplane.Image : "/low-poly-biplane.png"}
          alt={airplane.Title}
          width={200}
          height={200}
        />
      }
      <br />
      <Link href={airplane.Source}>{airplane.Title}</Link>
      <p>Maximum Speed: {airplane["Maximum speed"]} km/h</p>
    </div>
  );
};

const RankingFastest = ({ ranking }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [data, setRanking] = useState(ranking);

  const fetchData = async () => {
    const req = await fetch("http://localhost:8080/v1/airplanes/fastest?page=2");
    const result = await req.json();
    const newData = [...data, ...result];
    setRanking(newData);
  };

  const handleClick = (event: any) => {
    event.preventDefault();

    fetchData();
  };

  return (
    <>
      <Head>
        <title>Aviões na Web - aviões mais rápidos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Top 10 fastest planes</h1>
        <section>
          {ranking.map((airplane: Airplane, index) => renderAirplane(airplane, index))}
        </section>
        <button onClick={handleClick}>Next</button>
      </main>
    </>
  );
};

export const getServerSideProps = async () => {
  // Fetch data from external API
  const res = await fetch(`http://localhost:8080/v1/airplanes/fastest`);
  const ranking: Airplane[] = await res.json();

  // Pass data to the page via props
  return { props: { ranking } };
};

export default RankingFastest;
