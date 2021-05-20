import { useState, useEffect } from "react";
import Head from "next/head";
import ChartWrapper from "../components/ChartWrapper";
import styles from "./index.module.css";
import { getTotalNumberOfViewers, getAverageNumberOfViewers } from "../utils";

export default function Home() {
  const [initialData, setInitialData] = useState([]);
  const [linearKeys, setLinearKeys] = useState([]);
  const [query1, setQuery1] = useState("Program Title");
  const [query2, setQuery2] = useState("Number of Viewers");

  const [bandKeys, setBandKeys] = useState([
    "Number of Viewers",
    "Average Number of Viewers",
  ]);

  useEffect(() => {
    if (!initialData[0]) {
      return;
    }

    // Get list of keys to populate select
    const keys = Object.keys(initialData[0]);

    // Remove viewer numbers from set
    keys.pop();

    // Set updated keys
    setLinearKeys(keys);
  }, [initialData, query1, query2]);

  const handleSelect = (evt) => {
    setQuery1(evt.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>D3 with Next</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ChartWrapper
          data={initialData}
          setData={setInitialData}
          query1={query1}
          query2={query2}
        />
        <div>
          <span className={styles.span}>Get</span>
          <select
            name="query2"
            id="query2-select"
            onChange={(evt) => setQuery2(evt.target.value)}
          >
            {bandKeys.map((key) => (
              <>
                <option value={key}>{key}</option>
              </>
            ))}
          </select>
          <span className={styles.span}>for</span>
          <select
            name="query1"
            id="query1-select"
            onChange={(evt) => setQuery1(evt.target.value)}
          >
            {linearKeys.map((key) => (
              <option value={key}>{key}</option>
            ))}
          </select>
        </div>
      </main>
    </div>
  );
}
