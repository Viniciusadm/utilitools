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
            <option value="2">Acre</option>
            <option value="4">Alagoas</option>
            <option value="2">Amazonas</option>
            <option value="2">Amapá</option>
            <option value="5">Bahia</option>
            <option value="3">Ceará</option>
            <option value="1">Distrito Federal</option>
            <option value="7">Espirito Santo</option>
            <option value="1">Goiás</option>
            <option value="3">Maranhão</option>
            <option value="6">Minas Gerais</option>
            <option value="1">Mato Grosso do Sul</option>
            <option value="1">Mato Grosso</option>
            <option value="2">Pará</option>
            <option value="4">Paraíba</option>
            <option value="4">Pernambuco</option>
            <option value="3">Piauí</option>
            <option value="9">Paraná</option>
            <option value="7">Rio de Janeiro</option>
            <option value="4">Rio Grande do Norte</option>
            <option value="2">Rondônia</option>
            <option value="2">Roraima</option>
            <option value="0">Rio Grande do Sul</option>
            <option value="9">Santa Catarina</option>
            <option value="5">Sergipe</option>
            <option value="8">São Paulo</option>
            <option value="1">Tocantins</option>
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

        const copy = document.querySelector('#copy');
        copy.addEventListener('click', () => {
            copy.disabled = true;
            const cpf = document.querySelector('#cpf').innerHTML;
            navigator.clipboard.writeText(cpf).then(() => {
                Toastify({
                    text: "Copiado para a área de transferência",
                    position: "center",
                }).showToast();

                copy.innerHTML = '<i class="bi-clipboard-check"></i>';
                setTimeout(() => {
                    copy.innerHTML = '<i class="bi-clipboard"></i>';
                    copy.disabled = false;
                }, 1000);
            });
        });
    </script>
@endsection
