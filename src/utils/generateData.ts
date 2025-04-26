const generateData = (
  type: "year" | "month" | "week",
  hasIsolation: boolean
) => {
  const generateSequentialSum = (
    length: number,
    minStart: number,
    maxStart: number
  ) => {
    const sums: number[] = [];
    let currentSum =
      Math.floor(Math.random() * (maxStart - minStart + 1)) + minStart;
    sums.push(currentSum);

    for (let i = 1; i < length; i++) {
      const delta = Math.floor(currentSum * 0.05); // 5% dao động
      const nextSum =
        Math.floor(Math.random() * (2 * delta + 1)) + (currentSum - delta);
      currentSum = nextSum;
      sums.push(currentSum);
    }

    return sums;
  };

  const diseaseMonths = (() => {
    const start = Math.floor(Math.random() * 11); // chọn 1 tháng và tháng sau nó
    return [start, (start + 1) % 12];
  })();

  const generateEntries = (
    length: number,
    labels: string[],
    minStart: number,
    maxStart: number
  ) => {
    const sums = generateSequentialSum(length, minStart, maxStart);

    return Array.from({ length }, (_, i) => {
      const sum = sums[i];
      const isDisease = type === "year" && diseaseMonths.includes(i);
      const healthyRate = isDisease
        ? Math.random() * 0.2 + 0.65 // 65% – 85%
        : Math.random() * 0.1 + 0.85; // 85% – 95%

      const khoe = Math.floor(sum * healthyRate);
      const benh = sum - khoe;
      const cachly = hasIsolation
        ? Math.floor(benh * (Math.random() * 0.2 + 0.7)) // 70% – 90% of bệnh
        : undefined;

      return {
        name: labels[i],
        Khỏe: khoe,
        Bệnh: benh,
        ...(hasIsolation && { cachly }),
      };
    });
  };

  const labels = {
    year: Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`),
    month: Array.from({ length: 4 }, (_, i) => `Tuần ${i + 1}`),
    week: Array.from({ length: 7 }, (_, i) => `Ngày ${i + 1}`),
  };
  return {
    year: generateEntries(12, labels.year, 270, 330),
    month: generateEntries(4, labels.month, 270, 330),
    week: generateEntries(7, labels.week, 270, 330),
  }[type];
};

type ResourceType = "food" | "water" | "electricity" | "medicine";

const generateResourceData = (type: "year" | "month" | "week") => {
  const labels = {
    year: Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`),
    month: Array.from({ length: 4 }, (_, i) => `Tuần ${i + 1}`),
    week: Array.from({ length: 7 }, (_, i) => `Ngày ${i + 1}`),
  };

  const baseValues: Record<ResourceType, number> = {
    food: 500, // kg
    water: 1000, // lit
    electricity: 300, // kWh
    medicine: 50, // ml
  };

  const getFluctuated = (base: number) => {
    const delta = base * 0.1;
    return Math.floor(Math.random() * (2 * delta + 1)) + (base - delta);
  };

  const data = labels[type].map((name) => {
    const food = getFluctuated(baseValues.food);
    const water = getFluctuated(baseValues.water);
    const electricity = getFluctuated(baseValues.electricity);
    const medicine = getFluctuated(baseValues.medicine);

    return {
      name,
      "Thức ăn": food,
      Điện: electricity,
      "Y tế": medicine,
      Nước: water,
    };
  });

  const sum = data.reduce(
    (acc, item) => {
      acc["Thức ăn"] += item["Thức ăn"];
      acc["Nước"] += item["Nước"];
      acc["Điện"] += item["Điện"];
      acc["Y tế"] += item["Y tế"];
      return acc;
    },
    { "Thức ăn": 0, Nước: 0, Điện: 0, "Y tế": 0 }
  );

  return { data, sum };
};

const generateAnimalData = (type: "year" | "month" | "week") => {
  const labels = {
    year: Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`),
    month: Array.from({ length: 4 }, (_, i) => `Tuần ${i + 1}`),
    week: Array.from({ length: 7 }, (_, i) => `Ngày ${i + 1}`),
  };

  const baseValues: Record<string, number> = {
    Cừu: 200,
    Dê: 300,
    Lợn: 350,
  };

  const getFluctuated = (base: number) => {
    const delta = base * 0.1;
    return Math.floor(Math.random() * (2 * delta + 1)) + (base - delta);
  };

  const data: any = labels[type].map((name) => {
    const entry: Record<string, number> = {};
    Object.entries(baseValues).forEach(([animal, base]) => {
      entry[animal] = getFluctuated(base);
    });
    return { name, ...entry };
  });

  const sum = Object.keys(baseValues).reduce((acc, animal) => {
    acc[animal] = data.reduce(
      (total: number, item: any) => total + item[animal],
      0
    );
    return acc;
  }, {} as Record<string, number>);

  return { data, sum };
};

const generateStorageRateData = (type: "year" | "month" | "week") => {
  const labels = {
    year: Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`),
    month: Array.from({ length: 4 }, (_, i) => `Tuần ${i + 1}`),
    week: Array.from({ length: 7 }, (_, i) => `Ngày ${i + 1}`),
  };

  // Hàm random giá trị nhập, xuất (ví dụ từ 50% - 100%)
  const getRandomValue = () => Math.floor(Math.random() * 51) + 50; // từ 50 đến 100

  const data = labels[type].map((label) => ({
    name: label,
    Nhập: getRandomValue(),
    Xuất: getRandomValue(),
  }));

  return data;
};

export {
  generateData,
  generateResourceData,
  generateAnimalData,
  generateStorageRateData,
};
