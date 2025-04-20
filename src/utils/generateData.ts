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
        khoe,
        benh,
        ...(hasIsolation && { cachly }),
      };
    });
  };

  const labels = {
    year: Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`),
    month: Array.from({ length: 4 }, (_, i) => `Tuần ${i + 1}`),
    week: Array.from({ length: 7 }, (_, i) => `Ngày ${i + 1}`),
  };

  console.log(
    {
      year: generateEntries(12, labels.year, 270, 330),
      month: generateEntries(4, labels.month, 270, 330),
      week: generateEntries(7, labels.week, 270, 330),
    }[type]
  );
  return {
    year: generateEntries(12, labels.year, 270, 330),
    month: generateEntries(4, labels.month, 270, 330),
    week: generateEntries(7, labels.week, 270, 330),
  }[type];
};

export { generateData };
