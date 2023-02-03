import Image from "next/image";
import Link from "next/link";
import { Airplane } from "../pages/api/airplane.interface";
import styles from "../styles/Ranking.module.css";

export const renderAirplane = (airplane: Airplane, index: number, rank: keyof Airplane) => {
  function airplaneKeyMetric(key: keyof Airplane) {
    switch (key) {
      case "emptyWeight":
        return "kg";
      case "maximumSpeed":
        return "km/h";
      case "length":
        return "m";
      default:
        return "";
    }
  }

  function airplaneKeyName(key: keyof Airplane) {
    switch (key) {
      case "emptyWeight":
        return "Empty weight";
      case "maximumSpeed":
        return "Maximum speed";
      default:
        return key;
    }
  }

  return (
    <div key={index} className={styles.card}>
      <h2>{index + 1}º</h2>
      {
        <Image
          src={airplane.image ? airplane.image : "/low-poly-biplane.png"}
          alt={airplane.title}
          width={200}
          height={200}
        />
      }
      <br />
      <Link href={airplane.source}>{airplane.title}</Link>
      {airplane.role && <p>Role: {airplane.role}</p>}
      <p>
        {airplaneKeyName(rank)}: {airplane[rank]} {airplaneKeyMetric(rank)}
      </p>
    </div>
  );
};
