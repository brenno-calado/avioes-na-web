import { InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Head from "next/head";

type Airplane = {
    title: string,
    maximumSpeed: string
    image: string
}

const RankingFastest = ({ ranking }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <Head>
                <title>Aviões na Web - aviões mais rápidos</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>Top 10 fastest planes</h1>
                <section>
                {ranking.map((airplane: Airplane, index) => (
                    <div key={index}>
                        <h2>{index + 1}º</h2>
                        {airplane.image && <Image src={airplane.image} alt={airplane.title} width={200} height={200} />}
                        <p> {airplane.title}</p>
                        <p>Maximum Speed: {airplane.maximumSpeed} km/h</p>
                    </div>
                ))}
                </section>
            </main>
        </>
    );
}

export const getServerSideProps = async () => {
    // Fetch data from external API
    const res = await fetch(`http://localhost:8080/v1/airplanes/fastest`)
    const ranking: Airplane[] = await res.json()

    // Pass data to the page via props
    return { props: { ranking } }
}

export default RankingFastest;
