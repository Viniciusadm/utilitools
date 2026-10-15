import type { ToolSeo } from "@/lib/tool-seo";

export const SEO: Readonly<Record<string, ToolSeo>> = {
  "calculadora-de-porcentagem": {
    title: "Percentage Calculator – Discounts, Increases and % Change",
    description:
      "Free percentage calculator: find X% of a number, apply an increase or discount, see what percent one number is of another and get the percentage change.",
    faq: [
      {
        question: "How do I calculate a percentage of a number?",
        answer: "Multiply the number by the percentage and divide by 100. For example, 15% of 200 is 200 × 15 ÷ 100 = 30.",
      },
      {
        question: "How do I calculate a percentage discount?",
        answer:
          "Multiply the price by (1 − percentage ÷ 100). An $80 item with a 25% discount costs 80 × 0.75 = $60.",
      },
      {
        question: "How do I calculate the percentage increase between two values?",
        answer:
          "Subtract the initial value from the final value, divide by the initial value and multiply by 100. From 50 to 65, the increase is (65 − 50) ÷ 50 × 100 = 30%.",
      },
      {
        question: "How do I find what percent one number is of another?",
        answer: "Divide the part by the total and multiply by 100. 30 out of 120 is 30 ÷ 120 × 100 = 25%.",
      },
    ],
  },
  "calcular-idade": {
    title: "Age Calculator – Exact Age from Date of Birth",
    description:
      "Calculate your exact age in years, months and days from your date of birth. See the total days lived and how many days are left until your next birthday.",
    faq: [
      {
        question: "How do I calculate age from a date of birth?",
        answer:
          "Subtract the birth year from the current year, then subtract 1 if this year's birthday has not happened yet. The calculator does this automatically and also shows the months and days.",
      },
      {
        question: "How is age calculated for someone born on February 29?",
        answer: "In non-leap years, the calculator treats February 28 as the birthday.",
      },
      {
        question: "Can I calculate age on a specific date?",
        answer:
          "Yes. Change the reference date to find out how old someone was or will be on any day, such as the date of an exam, an application deadline or a trip.",
      },
    ],
  },
  "calculadora-imc": {
    title: "BMI Calculator – Body Mass Index (kg/cm, WHO Chart)",
    description:
      "Calculate your BMI from weight (kg) and height (cm) and see the WHO classification: underweight, normal, overweight or obese. Get your healthy weight range.",
    faq: [
      {
        question: "How do I calculate BMI?",
        answer:
          "Divide your weight in kilograms by your height in meters squared. At 70 kg and 1.75 m, BMI is 70 ÷ 3.0625 = 22.9.",
      },
      {
        question: "What is a healthy BMI?",
        answer: "For adults, the World Health Organization (WHO) considers a BMI between 18.5 and 24.9 to be normal weight.",
      },
      {
        question: "How do I find my healthy weight for my height?",
        answer:
          "Multiply your height in meters squared by 18.5 and by 24.9. The two results give your healthy weight range in kilograms. The calculator shows this range automatically.",
      },
      {
        question: "Does BMI apply to children and older adults?",
        answer:
          "No. The chart is for adults. Children and teenagers use age-based growth charts, and older adults have different reference ranges.",
      },
    ],
  },
  "calcular-dias-uteis": {
    title: "Business Days Calculator – Brazilian Holidays and Deadlines",
    description:
      "Count business days between two dates or add business days to a date to find a deadline, skipping weekends and Brazilian national holidays.",
    faq: [
      {
        question: "How do I calculate business days between two dates?",
        answer:
          "Count the days in the period and remove Saturdays, Sundays and holidays that fall on weekdays. The calculator does this automatically and lists the holidays it found.",
      },
      {
        question: "Which holidays does this calculator use?",
        answer:
          "Only Brazilian national holidays, such as Tiradentes Day, Brazilian Independence Day and Good Friday. Holidays of other countries are not considered, so it is best suited for deadlines in Brazil.",
      },
      {
        question: "Is Carnival a national holiday in Brazil?",
        answer:
          "No. Carnival and Corpus Christi are optional holidays (pontos facultativos) at the federal level, but many states, cities and companies close on those dates. You can choose whether they should be skipped.",
      },
      {
        question: "Does the calculator include state and municipal holidays?",
        answer: "No. It only considers Brazilian national holidays. Subtract the holidays of your city or state manually.",
      },
      {
        question: "Is the start date included in the count?",
        answer:
          "When counting between dates, both the start and end dates are included. When adding business days, counting starts on the business day after the start date, as with legal deadlines.",
      },
    ],
  },
  "calcular-resto": {
    title: "Remainder Calculator – Division with Remainder Online",
    description:
      "Calculate the quotient and remainder of a division between two whole numbers. Learn how division with remainder and the modulo operation work.",
    faq: [
      {
        question: "How do I calculate the remainder of a division?",
        answer:
          "Divide the dividend by the divisor, take the whole part of the result, multiply it by the divisor and subtract it from the dividend. For 17 ÷ 5, the quotient is 3 and the remainder is 17 − 15 = 2.",
      },
      {
        question: "What is the modulo operation?",
        answer:
          "Modulo (mod or %) is the operation that returns the remainder of a division. It is widely used in programming, for example to check whether a number is even.",
      },
      {
        question: "Can the remainder be greater than the divisor?",
        answer: "No. In integer division, the remainder is always smaller than the divisor.",
      },
    ],
  },
  "calcular-tres": {
    title: "Rule of Three Calculator – Solve Proportions Online",
    description:
      "Solve a simple rule of three online: enter three values and find the fourth proportional value. See the formula, how to set up the proportion and examples.",
    faq: [
      {
        question: "How do I solve a simple rule of three?",
        answer:
          "Set up the proportion so that B corresponds to A just as C corresponds to X. Cross-multiply and isolate X: X = A × C ÷ B.",
      },
      {
        question: "What is the difference between direct and inverse proportion?",
        answer:
          "In direct proportion, when one quantity increases the other increases too (more items, higher price). In inverse proportion, when one increases the other decreases (more workers, less time).",
      },
      {
        question: "Can I calculate percentages with the rule of three?",
        answer: "Yes, but the UtiliTools percentage calculator handles those cases more directly.",
      },
    ],
  },
  "converter-numeros": {
    title: "Number Base Converter – Binary, Decimal, Octal and Hex",
    description:
      "Convert numbers between binary, octal, decimal and hexadecimal in real time. Type in any base and watch the others update instantly.",
    faq: [
      {
        question: "How do I convert binary to decimal?",
        answer:
          "Multiply each digit by 2 raised to its position, counting from zero on the right, and add everything up. 1011 = 8 + 0 + 2 + 1 = 11.",
      },
      {
        question: "How do I convert decimal to binary?",
        answer:
          "Divide the number by 2 repeatedly and write down the remainders. Read from bottom to top, the remainders form the binary number.",
      },
      {
        question: "What is hexadecimal used for?",
        answer:
          "Hexadecimal is a compact way to write binary numbers: each digit represents 4 bits. It is used in CSS colors, memory addresses and error codes.",
      },
    ],
  },
  "converter-temperaturas": {
    title: "Temperature Converter – Celsius, Fahrenheit and Kelvin",
    description:
      "Convert temperatures between Celsius, Fahrenheit and Kelvin in real time. See the conversion formulas and practical examples.",
    faq: [
      {
        question: "How do I convert Celsius to Fahrenheit?",
        answer: "Multiply the temperature in Celsius by 1.8 and add 32. For example, 25 °C = 25 × 1.8 + 32 = 77 °F.",
      },
      {
        question: "How do I convert Fahrenheit to Celsius?",
        answer: "Subtract 32 and divide by 1.8. For example, 100 °F = (100 − 32) ÷ 1.8 ≈ 37.8 °C.",
      },
      {
        question: "How do I convert Celsius to Kelvin?",
        answer: "Add 273.15 to the temperature in Celsius. For example, 0 °C = 273.15 K.",
      },
    ],
  },
  "contar-dias": {
    title: "Days Between Dates Calculator – Count Days Online",
    description:
      "Count how many days there are between two dates. Great for working out deadlines, intervals, trips and time periods quickly and for free.",
    faq: [
      {
        question: "How do I calculate the number of days between two dates?",
        answer: "Pick the start date and the end date and click Calculate. The total number of days appears instantly.",
      },
      {
        question: "Does the count include the start date?",
        answer:
          "No. The result is the difference between the dates, without counting the start date. From March 12 to March 19, for example, there are 7 days.",
      },
      {
        question: "Can I calculate someone's age in days?",
        answer: "Yes, but the Age Calculator already shows age in years, months and days, plus the total number of days lived.",
      },
    ],
  },
};
