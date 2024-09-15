"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Shadcn Select

interface BarChartComponentProps {
  data: Record<string, Record<number, number>>; // Data by model
}

const chartConfig = {
  count: {
    label: "Range (km)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function BarChartComponent({ data }: BarChartComponentProps) {
  const [selectedModel, setSelectedModel] = useState<string>(
    Object.keys(data)[0]
  );

  useEffect(() => {
    setSelectedModel(Object.keys(data)[2]);
  }, [data]);

  const chartData =
    data[selectedModel] &&
    Object.entries(data[selectedModel]).map(([year, count]) => ({
      year,
      Range: count,
    }));

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">Range Increase by Year</CardTitle>
            <CardDescription className="text-base">
              Yearly Range Growth for the Selected EV Model
            </CardDescription>
          </div>
          <Select
            value={selectedModel}
            onValueChange={(value) => setSelectedModel(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(data).map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.toString().slice(0, 4)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              domain={["auto", "dataMax + 5"]} // Add 5 extra units at the top
            />
            <Tooltip />
            <Bar dataKey="Range" fill="var(--color-count)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 text-base font-medium leading-none">
          Up by 10% this year <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing electric vehicle range for the selected model over the years.
        </div>
      </CardFooter>
    </Card>
  );
}

export default BarChartComponent;
