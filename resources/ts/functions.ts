export const calculateCNPJDigit = (cnpj) => {
    let multiplier = 2;
    let sum = 0;
    for (let i = cnpj.length - 1; i >= 0; i--) {
        sum += parseInt(cnpj[i]) * multiplier;
        multiplier = (multiplier === 9) ? 2 : (multiplier + 1);
    }

    const remainder = sum % 11;
    return (remainder < 2) ? 0 : (11 - remainder);
};
