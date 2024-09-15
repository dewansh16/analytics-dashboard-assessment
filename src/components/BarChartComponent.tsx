"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BarChartComponentProps {
  data: Record<string, number>;
}

const chartConfig = {
  count: {
    label: "EV Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function BarChartComponent({ data }: BarChartComponentProps) {
  // Transform data into the chart format
  const chartData = Object.entries(data).map(([year, count]) => ({
    year,
    count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>EV Count by Year</CardTitle>
        <CardDescription>
          Electric Vehicle Population Growth Over the Years
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.toString().slice(0, 4)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this year <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing electric vehicle count for the last years
        </div>
      </CardFooter>
    </Card>
  );
}

export default BarChartComponent;
