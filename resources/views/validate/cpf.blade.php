@extends('layouts.app')

@section('title', 'Gerador de CPF')

@section('content')
    <main class="p-4 bg-a-light dark:bg-a-dark rounded-lg mt-4 w-screen sm:w-content">
        <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
            Validar CPF
        </h1>

        <p class="mb-2 sm:mb-3">
            Você pode validar um ou mais CPFs digitando-os abaixo. Basta clicar em validar e ver o resultado.
        </p>

        <a href="{{ route('generate.cpf') }}" class="text-info hover:underline block mb-4 sm:mb-6">
            Deseja gerar em vez validar?
        </a>

        <div class="mt-6">
            <div class="mb-3">
                <label for="cpf" class="block mb-2">
                    CPF
                </label>
                <div class="flex items-center mt-3">
                    <input
                        id="cpf"
                        class="w-[212px] bg-white dark:bg-b-dark p-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-700"
                        placeholder="000.000.000-00"
                        value="{{ $cpf }}"
                    >
                    <button id="validate" class="text-white rounded-md ml-3 px-4 py-2 bg-p-light dark:bg-p-dark hover:bg-p-light-light dark:hover:bg-p-dark-light">
                        Validar
                    </button>
                </div>
                <p id="response" class="my-3"></p>
            </div>
        </div>
    </main>
@endsection

@vite('resources/js/utils/cpf.js')

@section('scripts')
    <script>
        const validateCPF = () => {
            const cpf = document.querySelector('#cpf').value;
            const response = validate(cpf);

            document.querySelector('#response').classList.remove('text-success', 'text-danger');

            if (response.valid) {
                document.querySelector('#response').innerHTML = 'CPF válido';
                document.querySelector('#response').classList.add('text-success');
            } else {
                document.querySelector('#response').innerHTML = 'CPF inválido';
                document.querySelector('#response').classList.add('text-danger');
            }
        }

        document.querySelector('#validate').addEventListener('click', () => {
            validateCPF();
        });

        document.querySelector('#cpf').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                validateCPF();
            }
        });

        window.addEventListener('load', () => {
            if (document.querySelector('#cpf').value) {
                validateCPF();
            }

            IMask(document.querySelector('#cpf'), {
                mask: '000.000.000-00'
            });
        });
    </script>
@endsection
