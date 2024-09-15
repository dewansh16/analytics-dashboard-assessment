"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartDataEntry {
  Company: string;
  [key: string]: number | string;
}

interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

const colors = [
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

const transformData = (data: Record<string, Record<string, number>>) => {
  const result: ChartDataEntry[] = [];
  Object.entries(data).forEach(([make, models]) => {
    const entry: ChartDataEntry = { Company: make };
    Object.entries(models).forEach(([model, count]) => {
      entry[model] = count;
    });
    result.push(entry);
  });
  return result;
};

const generateChartConfig = (data: Record<string, Record<string, number>>) => {
  const config: ChartConfig = {};
  const models = new Set<string>();

  Object.values(data).forEach((modelsObj) => {
    Object.keys(modelsObj).forEach((model) => models.add(model));
  });

  Array.from(models).forEach((model, index) => {
    config[model] = {
      label: model,
      color: `hsl(var(--chart-${(index % colors.length) + 1}))`,
    };
  });

  return config;
};

function StackedBarChartComponent({
  data,
}: {
  data: Record<string, Record<string, number>>;
}) {
  const chartData = transformData(data);
  const chartConfig = generateChartConfig(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Electric Vehicle Distribution by Make and Model</CardTitle>
        <CardDescription>
          Visual representation of electric vehicle counts across different car
          manufacturers and their models. The chart illustrates the number of
          vehicles per model within each company, allowing for a clear
          comparison of model popularity across various manufacturers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.toLocaleString()} // Format numbers for better readability
            />
            <YAxis
              type="category"
              dataKey="Company"
              tickFormatter={(value) => value} // Display only the first letter of the company name
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              interval={0} // Show all ticks
              // angle={-45} // Rotate labels to avoid overlap
              textAnchor="end"
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            {Object.keys(chartConfig).map((model) => (
              <Bar
                key={model}
                dataKey={model}
                stackId="a"
                fill={chartConfig[model].color}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing data for different models and makes
        </div>
      </CardFooter>
    </Card>
  );
}

export default StackedBarChartComponent;
