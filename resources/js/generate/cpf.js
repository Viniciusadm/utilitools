window.generateCPF = (punctuation = true, uf = null) => {
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

    let cpf = '';
    for (let i = 0; i < 8; i++) {
        cpf += Math.floor(Math.random() * 9);
    }

    if (uf) {
        cpf += states.findIndex((state) => state.includes(uf));
    } else {
        cpf += Math.floor(Math.random() * 9);
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    let resto = soma % 11;
    let digito1 = (resto < 2) ? 0 : (11 - resto);

    cpf += digito1;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }

    resto = soma % 11;
    let digito2 = (resto < 2) ? 0 : (11 - resto);

    cpf += digito2;

    return punctuation ? punctuateCPF(cpf) : cpf;
}

const punctuateCPF = (cpf) => {
    return cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + '-' + cpf.substring(9);
}
