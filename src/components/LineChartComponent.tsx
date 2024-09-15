"use client";

import { TrendingUp } from "lucide-react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

interface LineChartComponentProps {
  data: Record<string, number>;
}

const chartConfig = {
  count: {
    label: "EV Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function LineChartComponent({ data }: LineChartComponentProps) {
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
          <LineChart
            accessibilityLayer
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
            <YAxis tickLine={false} axisLine={false} tickMargin={10} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="count"
              stroke="var(--color-count)"
              strokeWidth={2}
              dot={false}
              type="linear"
            />
          </LineChart>
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

export default LineChartComponent;
