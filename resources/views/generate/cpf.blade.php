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
    <script type="module">
        const generate = document.querySelector('#generate');
        generate.addEventListener('click', () => {
            generate.disabled = true;
            axios.post('/api/generator/cpf', {
                punctuation: document.querySelector('input[name="punctuation"]:checked').value,
                uf: document.querySelector('#uf').value
            })
            .then(({ data }) => {
                document.querySelector('#cpf').innerHTML = data.body;
            })
            .finally(() => {
                generate.disabled = false;
            });
        });
    </script>
@endsection
