import Image from "next/image";
import Link from "next/link";
import { Airplane } from "../pages/api/airplane.interface";
import styles from "../styles/Ranking.module.css";

export const renderAirplane = (airplane: Airplane, index: number) => {
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
      <p>Maximum Speed: {airplane["Maximum speed"]} km/h</p>
    </div>
  );
};
