@extends('layouts.app')

@section('title', 'Gerador de CPF')

@section('content')
    <main class="py-12 px-4 lg:px-0">
        <h1 class="text-3xl font-semibold">
            Validar CPF
        </h1>

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

@vite('resources/js/generate/cpf.js')

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
        });
    </script>
@endsection
