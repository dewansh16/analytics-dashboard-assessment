import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type topMakerType = { make: string; totalEVs: number; increase: number };
type evPopulationIncreaseType = {
  latestYearEVs: number;
  secondLatestYearEVs: number;
  rateOfIncrease: number;
};

// type topModelType = { company: string; model: string; range: number };

export function getEVsByYear(
  data: Record<string, string>[]
): Record<string, number> {
  return data.reduce((acc: Record<string, number>, row) => {
    const year = row["Model Year"];
    if (year) {
      acc[year] = (acc[year] || 0) + 1;
    }
    return acc;
  }, {});
}

export function getEVsByMake(
  data: Record<string, string>[]
): Record<string, number> {
  return data.reduce((acc: Record<string, number>, row) => {
    const make = row["Make"];
    if (make) {
      acc[make] = (acc[make] || 0) + 1;
    }
    return acc;
  }, {});
}

export function getEVsByCity(
  data: Record<string, string>[]
): Record<string, number> {
  return data.reduce((acc: Record<string, number>, row) => {
    const city = row["City"];
    if (city) {
      acc[city] = (acc[city] || 0) + 1;
    }
    return acc;
  }, {});
}

export function getEVsByType(
  data: Record<string, string>[]
): Record<string, number> {
  return data.reduce((acc: Record<string, number>, row) => {
    const type = row["Electric Vehicle Type"];
    if (type) {
      acc[type] = (acc[type] || 0) + 1;
    }
    return acc;
  }, {});
}

// function getAverageRangeByYear(data: Record<string, string>[]): Record<string, number> {
//   const rangeData = data.reduce(
//     (acc: Record<string, { totalRange: number; count: number }>, row) => {
//       const year = row["Model Year"];
//       const range = parseFloat(row["Electric Range"]);

//       if (year && !isNaN(range)) {
//         if (!acc[year]) {
//           acc[year] = { totalRange: 0, count: 0 };
//         }
//         acc[year].totalRange += range;
//         acc[year].count += 1;
//       }

//       return acc;
//     },
//     {}
//   );

//   // Compute the average for each year
//   const avgRangeByYear: Record<string, number> = {};
//   Object.keys(rangeData).forEach((year) => {
//     avgRangeByYear[year] = rangeData[year].totalRange / rangeData[year].count;
//   });

//   return avgRangeByYear;
// }

export function getEVsByCAFVEligibility(
  data: Record<string, string>[]
): Record<string, number> {
  return data.reduce((acc: Record<string, number>, row) => {
    const eligibility =
      row["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];
    if (eligibility) {
      acc[eligibility] = (acc[eligibility] || 0) + 1;
    }
    return acc;
  }, {});
}

export function getRangeByCompanyModelAndYear(
  data: Record<string, string>[]
): Record<string, Record<string, number>> {
  const rangeData = data.reduce(
    (
      acc: Record<
        string,
        Record<string, { totalRange: number; count: number }>
      >,
      row
    ) => {
      const companyModel = `${row["Make"]} ${row["Model"]}`; // Combine Make and Model
      const year = row["Model Year"];
      const range = parseFloat(row["Electric Range"]);

      if (companyModel && year && !isNaN(range) && range > 0) {
        if (!acc[companyModel]) {
          acc[companyModel] = {};
        }
        if (!acc[companyModel][year]) {
          acc[companyModel][year] = { totalRange: 0, count: 0 };
        }
        acc[companyModel][year].totalRange += range;
        acc[companyModel][year].count += 1;
      }

      return acc;
    },
    {}
  );

  // Compute the average for each company+model and year
  const avgRangeByCompanyModelAndYear: Record<
    string,
    Record<string, number>
  > = {};
  Object.keys(rangeData).forEach((companyModel) => {
    avgRangeByCompanyModelAndYear[companyModel] = {};
    Object.keys(rangeData[companyModel]).forEach((year) => {
      avgRangeByCompanyModelAndYear[companyModel][year] =
        rangeData[companyModel][year].totalRange /
        rangeData[companyModel][year].count;
    });
  });

  return avgRangeByCompanyModelAndYear;
}

export function getMakeWithMostEVsAndIncrease(
  data: Record<string, string>[]
): topMakerType {
  const yearCountData = data.reduce(
    (acc: Record<string, Record<string, number>>, row) => {
      const make = row["Make"];
      const year = row["Model Year"];

      if (make && year) {
        if (!acc[make]) {
          acc[make] = {};
        }
        if (!acc[make][year]) {
          acc[make][year] = 0;
        }
        acc[make][year] += 1;
      }

      return acc;
    },
    {}
  );

  let mostEVMake = "";
  let mostEVCount = 0;
  let latestYear = "";
  let secondLatestYear = "";
  let maxIncrease = 0;

  // Get the latest two years by converting Set to Array
  const years = Array.from(new Set(data.map((row) => row["Model Year"]))).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );
  if (years.length > 1) {
    latestYear = years[0];
    secondLatestYear = years[1];
  }

  // Find make with most EVs and calculate the increase over the last two years
  Object.keys(yearCountData).forEach((make) => {
    const totalEVs = Object.values(yearCountData[make]).reduce(
      (sum, count) => sum + count,
      0
    );

    // Track the make with the most EVs overall
    if (totalEVs > mostEVCount) {
      mostEVMake = make;
      mostEVCount = totalEVs;
    }

    // Calculate increase over the last two years for this make
    const evsLastYear = yearCountData[make][latestYear] || 0;
    const evsSecondLastYear = yearCountData[make][secondLatestYear] || 0;
    const increase = evsLastYear - evsSecondLastYear;

    if (make === mostEVMake) {
      maxIncrease = increase;
    }
  });

  return {
    make: mostEVMake,
    totalEVs: mostEVCount,
    increase: maxIncrease,
  };
}

export function getTotalEVPopulationIncrease(
  data: Record<string, string>[]
): evPopulationIncreaseType {
  const yearCountData = data.reduce((acc: Record<string, number>, row) => {
    const year = row["Model Year"];

    if (year) {
      if (!acc[year]) {
        acc[year] = 0;
      }
      acc[year] += 1;
    }

    return acc;
  }, {});

  let latestYear = "";
  let secondLatestYear = "";
  let latestYearEVs = 0;
  let secondLatestYearEVs = 0;

  // Get the latest two years
  const years = Object.keys(yearCountData).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );
  if (years.length > 1) {
    latestYear = years[0];
    secondLatestYear = years[1];

    latestYearEVs = yearCountData[latestYear];
    secondLatestYearEVs = yearCountData[secondLatestYear];
  }

  // Calculate the rate of increase
  const rateOfIncrease =
    secondLatestYearEVs > 0
      ? ((latestYearEVs - secondLatestYearEVs) / secondLatestYearEVs) * 100
      : 0;

  return {
    latestYearEVs,
    secondLatestYearEVs,
    rateOfIncrease,
  };
}

export function getModelWithMostRange(data: Record<string, string>[]): {
  company: string;
  model: string;
  range: number;
} {
  let maxRange = 0;
  let companyWithMaxRange = "";
  let modelWithMaxRange = "";

  data.forEach((row) => {
    const range = parseFloat(row["Electric Range"]);
    const company = row["Make"];
    const model = row["Model"];

    if (!isNaN(range) && range > maxRange) {
      maxRange = range;
      companyWithMaxRange = company;
      modelWithMaxRange = model;
    }
  });

  return {
    company: companyWithMaxRange,
    model: modelWithMaxRange,
    range: maxRange,
  };
}

export function getEVCountByMakeAndModel(data: Record<string, string>[]) {
  return data.reduce((acc, curr) => {
    const Make = curr["Make"];
    const Model = curr["Model"];

    // Ensure the 'Make' exists in the accumulator
    if (!acc[Make]) {
      acc[Make] = {};
    }

    // If the 'Model' doesn't exist under the 'Make', initialize it with 0
    if (!acc[Make][Model]) {
      acc[Make][Model] = 0;
    }

    // Increment the count for the specific model under the make
    acc[Make][Model] += 1;

    return acc;
  }, {} as Record<string, Record<string, number>>);
}

export function formatNumberWithCommas(number: number) {
  if (!number) return 0;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
