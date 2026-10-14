export type BmiCategory = {
  label: string;
  min: number;
  max: number;
};

export const BMI_CATEGORIES: readonly BmiCategory[] = [
  { label: "Abaixo do peso", min: 0, max: 18.5 },
  { label: "Peso normal", min: 18.5, max: 25 },
  { label: "Sobrepeso", min: 25, max: 30 },
  { label: "Obesidade grau I", min: 30, max: 35 },
  { label: "Obesidade grau II", min: 35, max: 40 },
  { label: "Obesidade grau III", min: 40, max: Infinity },
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
