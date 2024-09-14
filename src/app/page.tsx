"use client";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import Badge from "@/components/badge";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [evData, setEvData] = useState([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [eVPopulation, setEVPopulation] = useState<Number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/Electric_Vehicle_Population_Data.csv");
      const csvData = await response.text();
      Papa.parse(csvData, {
        header: true,
        complete: (result: any) => {
          setEvData(result.data);
          const { data } = result || [];
          const newHeaders = Object.keys(result.data[0] || {});
          setHeaders(newHeaders);
          setEVPopulation(data.length);
        },
      });
    };

    fetchData();
  }, []);

  console.log("evData = ", evData);

  return (
    <div className="p-10 pl-16 h-dvh w-dvw">
      <div className="w-full">
        <div className="flex gap-4">
          <Card className="w-full p-4">
            <p className="pb-2 flex gap-2.5 items-center ">
              Total EV population
              <Badge percentage={72} />
            </p>
            <p className="text-3xl font-semibold">{`${eVPopulation}`}</p>
          </Card>
          <Card className="w-full p-4">
            <p className="pb-2 flex gap-2.5 items-center ">
              Total EV population
              <Badge percentage={72} />
            </p>
            <p className="text-3xl font-semibold">{`${eVPopulation}`}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
