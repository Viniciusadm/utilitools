@extends('layouts.app')

@section('title', 'Gerador de CPF')

@section('content')
    <main class="p-4 bg-a-light dark:bg-a-dark rounded-lg mt-4 w-screen sm:w-content">
        <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
            Gerador de CPF
        </h1>

        <p class="mb-4 sm:mb-6">
            Gerador de CPFs válidos aleatórios. Você pode escolher se quer pontuação ou não e o estado.
            Basta clicar em gerar e copiar o CPF gerado.
        </p>

        <div class="mb-2 sm:mb-3">
            <p class="mb-2 sm:mb-3">
                Pontuação?
            </p>
            <div class="flex gap-3">
                <div class="flex items-center">
                    <input checked id="yes" type="radio" value="1" name="punctuation" class="w-4 h-4 text-blue-600 bg-gray-100">
                    <label for="yes" class="ml-2 text-sm font-medium">Sim</label>
                </div>
                <div class="flex items-center">
                    <input id="no" type="radio" value="2" name="punctuation" class="w-4 h-4 text-blue-600 bg-gray-100">
                    <label for="no" class="ml-2 text-sm font-medium">Não</label>
                </div>
            </div>
        </div>

        <label for="uf" class="block mb-2 sm:mb-3">
            Estado
        </label>
        <select
            id="uf"
            class="border rounded-lg block p-2.5 bg-white dark:bg-a-dark mb-2 sm:mb-3 w-full sm:w-40"
        >
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

        <button
            id="generate"
            class="text-white rounded-md px-4 py-2 bg-p-light dark:bg-p-dark hover:bg-p-light-light dark:hover:bg-p-dark-light mb-4 sm:mb-6 block text-center w-full sm:w-40"
        >
            Gerar
        </button>

        <p>
            CPF gerado
        </p>

        <div class="flex gap-2 items-center mb-2 sm:mb-3">
            <p id="cpf" class="text-2xl font-semibold my-3 w-[212px]">
                000.000.000-00
            </p>
            <button id="copy" class="text-white bg-transparent rounded-md h-10 px-4 border border-white">
                <i class="bi-clipboard"></i>
            </button>
        </div>

        <a
            href="{{ route('validate.cpf') }}"
            class="text-white rounded-md px-4 py-2 bg-s-light dark:bg-s-dark hover:bg-s-light-light dark:hover:bg-s-dark-light mb-4 sm:mb-6 block text-center w-full sm:w-40"
            id="validate"
        >
            Validar CPF
        </a>
     </main>
@endsection

@vite('resources/js/generate/cpf.js')

@section('scripts')
    <script>
        document.querySelector('#generate').addEventListener('click', () => {
            const punctuation = document.querySelector('input[name="punctuation"]:checked').value === '1';
            const uf = document.querySelector('#uf').value;

            const generated = generate(punctuation, uf);
            document.querySelector('#cpf').innerHTML = generated;
            document.querySelector('#validate').href = `{{ route('validate.cpf') }}?cpf=${generated}`;
        });

        document.querySelector('#copy').addEventListener('click', () => {
            const cpf = document.querySelector('#cpf').innerHTML;
            navigator.clipboard.writeText(cpf);
        });
    </script>
@endsection
