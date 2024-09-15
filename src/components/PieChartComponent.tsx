"use client";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PieChartComponentProps {
  data: Record<string, number>;
  title?: string;
  description?: string;
}

const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)",
  "var(--chart-9)",
  "var(--chart-10)",
];

function generateChartData(
  data: Record<string, number>,
  chartConfig: Record<string, { label: string; color: string }>
) {
  return Object.entries(data).map(([name, value]) => ({
    name,
    value,
    fill: chartConfig[`${name}`].color,
  }));
}

function generateChartConfig(data: Record<string, number>) {
  const config: Record<string, { label: string; color: string }> = {};
  Object.keys(data).forEach((key: string, index) => {
    config[key] = {
      label: key,
      color: `hsl(var(--chart-${(index % chartColors.length) + 1}))`, // Use the color index
    };
  });
  return config;
}

export function PieChartComponent({
  data,
  title = "",
  description = "",
}: PieChartComponentProps) {
  const chartConfig = generateChartConfig(data);
  // console.log("chartConfig = ", chartConfig);

  const chartData = React.useMemo(
    () => generateChartData(data, chartConfig),
    [data, chartConfig]
  );
  // console.log("charData = ", chartData);

  const totalCount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col justify-center items-center">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">Data Overview</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          style={{ width: "100%", height: "250px" }}
          className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold">
                          {totalCount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground">
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {/* You can add trending or growth information here */}
        </div>
        <div className="leading-none text-muted-foreground w-2/3 text-center">
          {description}
        </div>
      </CardFooter>
    </Card>
  );
}
