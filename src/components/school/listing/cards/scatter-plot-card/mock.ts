export interface DataPoint {
  sat: number;
  gpa: number;
  status: "accepted" | "rejected" | "considering";
}

export interface UserPoint {
  sat: number;
  gpa: number;
}

export interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const userPoint: UserPoint = {
  sat: 1554,
  gpa: 4.0,
};

export const generateMockData = (): DataPoint[] => {
  const statuses: Array<"accepted" | "rejected" | "considering"> = [
    "accepted",
    "rejected",
    "considering",
  ];
  const numPoints = 1000;
  const data: DataPoint[] = [];

  for (let i = 0; i < numPoints; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    let sat: number, gpa: number;

    if (status === "accepted") {
      sat = 1200 + Math.random() * 400;
      gpa = 3.3 + Math.random() * 0.7;
    } else if (status === "rejected") {
      sat = 1000 + Math.random() * 500;
      gpa = 2.5 + Math.random() * 1.0;
    } else {
      sat = 1100 + Math.random() * 450;
      gpa = 2.8 + Math.random() * 0.9;
    }

    data.push({ sat, gpa, status });
  }

  return data;
};

export const majorOptions = [
  { value: "all", label: "All Majors" },
  { value: "engineering", label: "Engineering" },
  { value: "arts", label: "Arts & Sciences" },
  { value: "business", label: "Business" },
];
