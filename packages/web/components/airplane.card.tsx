import Image from "next/image";
import Link from "next/link";
import { Airplane } from "../pages/api/airplane.interface";
import styles from "../styles/Ranking.module.css";

export const renderAirplane = (airplane: Airplane, index: number, rank: keyof Airplane) => {
  function airplaneKeyMetric(key: keyof Airplane) {
    switch (key) {
      case "Empty weight":
        return "kg";
      case "Maximum speed":
        return "km/h";
      default:
        return "";
    }
  }

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
      {airplane.Role && <p>Role: {airplane.Role}</p>}
      <p>
        {rank}: {airplane[rank]} {airplaneKeyMetric(rank)}
      </p>
    </div>
  );
};
