const states = [
    ['RS'],
    ['DF', 'GO', 'MT', 'MS', 'TO'],
    ['AC', 'AM', 'AP', 'PA', 'RO', 'RR'],
    ['CE', 'MA', 'PI'],
    ['PB', 'PE', 'AL', 'RN'],
    ['BA', 'SE'],
    ['MG'],
    ['RJ', 'ES'],
    ['SP'],
    ['PR', 'SC'],
];

window.generate = (punctuation = true, uf = null) => {
    let cpf = '';
    for (let i = 0; i < 8; i++) {
        cpf += Math.floor(Math.random() * 9);
    }

    if (uf) {
        cpf += uf;
    } else {
        cpf += Math.floor(Math.random() * 9);
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]) * (10 - i);
    }
    let rest = sum % 11;
    let digit1 = (rest < 2) ? 0 : (11 - rest);

    cpf += digit1;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i]) * (11 - i);
    }

    rest = sum % 11;
    let digit2 = (rest < 2) ? 0 : (11 - rest);

    cpf += digit2;

    return punctuation ? punctuateCPF(cpf) : cpf;
}

window.validate = (cpf) => {
    cpf = cpf.replace(/\D/g, '');

    if (!/^(\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/.test(cpf) || /^(0{11}|1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11})$/.test(cpf)) {
        return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]) * (10 - i);
    }

    let rest = sum % 11;
    let digit1 = (rest < 2) ? 0 : (11 - rest);

    if (digit1 !== parseInt(cpf[9])) {
        return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i]) * (11 - i);
    }

    rest = sum % 11;
    let digit2 = (rest < 2) ? 0 : (11 - rest);

    return {
        valid: (digit2 === parseInt(cpf[10])),
        states: states[digit1]
    };
}

const punctuateCPF = (cpf) => {
    return cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + '-' + cpf.substring(9);
}
