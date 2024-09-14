"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Papa from "papaparse";

export default function Home() {
  const [evData, setEvData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/Electric_Vehicle_Population_Data.csv");
      const csvData = await response.text();
      Papa.parse(csvData, {
        header: true, // Set to false if you don't want headers
        complete: (result: any) => {
          console.log("result = ", result);
          setEvData(result.data);
        },
      });
    };

    fetchData();
  }, []);

  console.log("evData = ", evData);

  return <div></div>;
}
