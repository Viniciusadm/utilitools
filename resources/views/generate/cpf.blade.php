@extends('layouts.app')

@section('title', 'Gerador de CPF')

@section('content')
    <main class="py-12 px-4 lg:px-0">
        <h1 class="text-3xl font-semibold">
            Gerador de CPF
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="mt-6">
                <div class="mb-3">
                    <p>
                        Pontuação?
                    </p>
                    <label class="inline-flex items-center mt-3">
                        <input type="radio" class="form-radio" name="punctuation" value="1" checked>
                        <span class="ml-2">Sim</span>
                    </label>
                    <label class="inline-flex items-center mt-3 ml-6">
                        <input type="radio" class="form-radio" name="punctuation" value="0">
                        <span class="ml-2">Não</span>
                    </label>
                </div>
                <div>
                    <label for="uf" class="block mb-2">
                        Estado
                    </label>
                    <select name="uf" id="uf" class="block bg-white dark:bg-b-dark p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm">
                        <option value="">Qualquer</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AM">Amazonas</option>
                        <option value="AP">Amapá</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espirito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="PR">Paraná</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SE">Sergipe</option>
                        <option value="SP">São Paulo</option>
                        <option value="TO">Tocantins</option>
                    </select>
                </div>
            </div>

            <div class="mt-6">
                <div class="mb-3">
                    <p>
                        CPF gerado
                    </p>
                    <div class="flex items-center mt-3">
                        <p id="cpf" class="text-2xl font-semibold w-[212px]">
                            000.000.000-00
                        </p>
                        <button id="generate" class="text-white rounded-md ml-3 px-4 py-2 bg-p-light dark:bg-p-dark hover:bg-p-light-light dark:hover:bg-p-dark-light">
                            Gerar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
@endsection

@section('scripts')
    <script>
        const generateCPF = (punctuation = true, uf = null) => {
            const states = {
                'DF': 1,
                'GO': 1,
                'MT': 1,
                'MS': 1,
                'TO': 1,
                'AC': 2,
                'AM': 2,
                'AP': 2,
                'PA': 2,
                'RO': 2,
                'RR': 2,
                'CE': 3,
                'MA': 3,
                'PI': 3,
                'PB': 4,
                'PE': 4,
                'AL': 4,
                'RN': 4,
                'BA': 5,
                'SE': 5,
                'MG': 6,
                'RJ': 7,
                'ES': 7,
                'SP': 8,
                'PR': 9,
                'SC': 9,
                'RS': 0,
            };

            let cpf = '';
            for (let i = 0; i < 8; i++) {
                cpf += Math.floor(Math.random() * 9);
            }

            if (uf) {
                cpf += states[uf];
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

        const generate = document.querySelector('#generate');
        generate.addEventListener('click', () => {
            const punctuation = document.querySelector('input[name="punctuation"]:checked').value === '1';
            const uf = document.querySelector('#uf').value;

            document.querySelector('#cpf').innerHTML = generateCPF(punctuation, uf);
        });
    </script>
@endsection
