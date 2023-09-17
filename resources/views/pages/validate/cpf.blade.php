@extends('layouts.app')

@section('title', 'Validar CPF')

@section('meta')
    <meta name="title" content="Validar CPF">
    <meta name="description" content="Validador de CPFs. Você pode validar um ou mais CPFs digitando-os abaixo. Basta clicar em validar e ver o resultado.">
    <meta name="keywords" content="validar cpf, validar cpf online">
    <meta property="og:title" content="Validar CPF">
    <meta property="og:description" content="Validador de CPFs. Você pode validar um ou mais CPFs digitando-os abaixo. Basta clicar em validar e ver o resultado.">
    <meta property="og:url" content="{{ route('validate.cpf') }}">
@endsection

@section('content')
    <main class="p-4 bg-a-light dark:bg-a-dark rounded-lg mt-4 w-screen sm:w-content">
        <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
            Validar CPF
        </h1>

        <p class="mb-2 sm:mb-3">
            Você pode validar um ou mais CPFs digitando-os abaixo. Basta clicar em validar e ver o resultado.
        </p>

        <a
            href="{{ route('generate.cpf') }}"
            class="text-info hover:underline block mb-4 sm:mb-6"
            aria-label="Deseja gerar em vez validar?"
        >
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
                        class="w-[212px] bg-white dark:bg-a-dark p-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-700"
                        placeholder="000.000.000-00"
                        value="{{ $cpf }}"
                    >
                    <button
                        id="validate"
                        class="text-white rounded-md ml-3 px-4 py-2 bg-p-light dark:bg-p-dark hover:bg-p-light-light dark:hover:bg-p-dark-light"
                        aria-label="Validar"
                    >
                        Validar
                    </button>
                </div>
                <p id="response" class="my-3 font-bold"></p>
            </div>
        </div>

        @include('includes.articles.cpf')
    </main>
@endsection

@vite('resources/ts/utils/cpf.ts')
