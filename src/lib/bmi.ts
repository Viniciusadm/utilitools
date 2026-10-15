export type BmiCategoryCode =
  | "underweight"
  | "normal"
  | "overweight"
  | "obesityClass1"
  | "obesityClass2"
  | "obesityClass3";

export type BmiCategory = {
  code: BmiCategoryCode;
  min: number;
  max: number;
};

export const BMI_CATEGORIES: readonly BmiCategory[] = [
  { code: "underweight", min: 0, max: 18.5 },
  { code: "normal", min: 18.5, max: 25 },
  { code: "overweight", min: 25, max: 30 },
  { code: "obesityClass1", min: 30, max: 35 },
  { code: "obesityClass2", min: 35, max: 40 },
  { code: "obesityClass3", min: 40, max: Infinity },
];

const NORMAL_MIN = 18.5;
const NORMAL_MAX = 24.9;

export function calculateBmi(weightKg: number, heightM: number) {
  return weightKg / (heightM * heightM);
}

export function bmiCategory(bmi: number) {
  return BMI_CATEGORIES.find((category) => bmi >= category.min && bmi < category.max) ?? BMI_CATEGORIES[0];
}

export function healthyWeightRange(heightM: number) {
  return { min: NORMAL_MIN * heightM * heightM, max: NORMAL_MAX * heightM * heightM };
}

export function parseHeightToMeters(value: number) {
  return value > 3 ? value / 100 : value;
}
