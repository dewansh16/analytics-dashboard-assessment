"use client";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import Badge from "@/components/Badge";
import { Card } from "@/components/ui/card";
import {
  formatNumberWithCommas,
  getEVCountByMakeAndModel,
  getEVsByCAFVEligibility,
  getEVsByMake,
  getEVsByType,
  getEVsByYear,
  getMakeWithMostEVsAndIncrease,
  getModelWithMostRange,
  getRangeByCompanyModelAndYear,
  getTotalEVPopulationIncrease,
} from "@/lib/utils";
import { PieChartComponent } from "@/components/PieChartComponent";
import LineChartComponent from "@/components/LineChartComponent";
import StackedBarChartComponent from "@/components/StackedBarChartComponent";
import BarChartComponent from "@/components/BarChart";

type topMakerType = { make: string; totalEVs: number; increase: number };
type evPopulationIncreaseType = {
  latestYearEVs: number;
  secondLatestYearEVs: number;
  rateOfIncrease: number;
};

type topModelType = { company: string; model: string; range: number };

export default function Home() {
  const [eVPopulation, setEVPopulation] = useState<number>(0);
  const [evByYear, setEvByYear] = useState<Record<string, number>>({});
  const [evByMake, setEvByMake] = useState<Record<string, number>>({});
  // const [evByCity, setEvByCity] = useState<Record<string, number>>({});
  const [evByType, setEvByType] = useState<Record<string, number>>({});
  const [topEvModel, setTopEvModel] = useState<topModelType>({
    company: "",
    model: "",
    range: 0,
  });
  const [evByEligibility, setEvByEligibility] = useState<
    Record<string, number>
  >({});
  const [rangeByMakeAndYear, setRangeByMakeAndYear] = useState<
    Record<string, Record<string, number>>
  >({});
  const [totalPopIncrease, setTotalPopIncrease] =
    useState<evPopulationIncreaseType>({
      latestYearEVs: 0,
      secondLatestYearEVs: 0,
      rateOfIncrease: 0,
    });

  const [makerWithMostEVsAndIncrease, setMakerWithMostEVsAndIncrease] =
    useState<topMakerType>({
      make: "",
      totalEVs: 0,
      increase: 0,
    });

  const [modelCount, setModelCount] = useState<
    Record<string, Record<string, number>>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/Electric_Vehicle_Population_Data.csv");
      const csvData = await response.text();
      Papa.parse(csvData, {
        header: true,
        complete: (result: { data: Record<string, string>[] }) => {
          const { data } = result || [];

          const newEvByYear = getEVsByYear(data);
          setEvByYear(newEvByYear);

          const newEvByMake = getEVsByMake(data);
          setEvByMake(newEvByMake);

          const newEvByType = getEVsByType(data);
          setEvByType(newEvByType);

          const newEvByEligibility = getEVsByCAFVEligibility(data);
          setEvByEligibility(newEvByEligibility);

          const newRangeByMakeAndYear = getRangeByCompanyModelAndYear(data);
          setRangeByMakeAndYear(newRangeByMakeAndYear);

          const newTotalPopIncreate = getTotalEVPopulationIncrease(data);
          setTotalPopIncrease(newTotalPopIncreate);

          const makerWithMostEVsAndIncrease =
            getMakeWithMostEVsAndIncrease(data);
          setMakerWithMostEVsAndIncrease(makerWithMostEVsAndIncrease);

          const newTopModel = getModelWithMostRange(data);
          setTopEvModel(newTopModel);

          const newModelCount = getEVCountByMakeAndModel(data);
          setModelCount(newModelCount);

          setEVPopulation(data.length);
        },
      });
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-y-10 p-5 lg:p-10 pl-8 max-lg:pt-8 lg:pl-16 h-dvh w-dvw">
      <div className="w-full flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-2/3 flex flex-col gap-4">
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <Card className="flex-1 p-4">
                <p className="pb-2 flex gap-2.5 items-center ">
                  Total EV population
                  <Badge percentage={totalPopIncrease.rateOfIncrease} />
                </p>
                <p className="text-3xl font-semibold">
                  {formatNumberWithCommas(+`${eVPopulation - 1}`)}
                </p>
              </Card>
              <Card className="flex-1 p-4">
                <p className="pb-2 flex gap-2.5 items-center ">
                  Top EV Maker
                  <Badge
                    percentage={
                      (makerWithMostEVsAndIncrease.increase /
                        makerWithMostEVsAndIncrease.totalEVs) *
                      100
                    }
                  />
                </p>
                <p className="text-3xl font-semibold">
                  {makerWithMostEVsAndIncrease.make}
                </p>
              </Card>
              <Card className="flex-1 p-4">
                <p className="pb-2 flex gap-2.5 items-center ">
                  Type of EV (BEVs/PHEVs)
                </p>
                <p className="text-3xl font-semibold">
                  {formatNumberWithCommas(
                    evByType["Battery Electric Vehicle (BEV)"]
                  )}
                  /
                  {formatNumberWithCommas(
                    evByType["Plug-in Hybrid Electric Vehicle (PHEV)"]
                  )}
                </p>
              </Card>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <Card className="flex-1 p-4">
                <p className="pb-2 flex gap-2.5 items-center ">
                  CAFV Eligibility{" "}
                  <Badge
                    percentage={
                      (evByEligibility[
                        "Clean Alternative Fuel Vehicle Eligible"
                      ] /
                        +eVPopulation) *
                      100
                    }
                  />
                </p>
                <p className="text-3xl font-semibold">
                  {formatNumberWithCommas(
                    evByEligibility["Clean Alternative Fuel Vehicle Eligible"]
                  )}
                </p>
              </Card>
              <Card className="flex-1 p-4">
                <p className="pb-2 flex gap-2.5 items-center ">Max Range EV</p>
                <p className="text-3xl font-semibold">
                  {topEvModel.company +
                    " " +
                    topEvModel.model +
                    " (" +
                    topEvModel.range +
                    ")"}
                </p>
              </Card>
              <Card className="flex-1 p-4">
                <p className="pb-2 flex gap-2.5 items-center ">
                  Total EV Models
                </p>
                <p className="text-3xl font-semibold">
                  {Object.keys(rangeByMakeAndYear).length}
                </p>
              </Card>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/3 flex flex-col gap-4">
          <PieChartComponent
            data={evByMake}
            title="Electric Vehicle Market Share"
            description="Distribution of different companies by the number of their vehicles in the EV market"
          />
        </div>
      </div>
      <div className="w-full">
        <LineChartComponent data={evByYear} />
      </div>
      <div>
        <StackedBarChartComponent data={modelCount} />
      </div>
      <div>
        <BarChartComponent data={rangeByMakeAndYear} />
      </div>
    </div>
  );
}
