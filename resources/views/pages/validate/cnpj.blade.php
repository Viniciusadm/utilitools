@extends('layouts.app')

@section('title', 'Validar CNPJ')

@section('meta')
    <meta name="title" content="Validar CNPJ">
    <meta name="description" content="Validador de CNPJs. Você pode validar um CNPJ digitando-o abaixo. Basta clicar em validar e ver o resultado.">
    <meta name="keywords" content="validar cnpj, validar cnpj online">
    <meta property="og:title" content="Validar CNPJ">
    <meta property="og:description" content="Validador de CNPJs. Você pode validar um CNPJ digitando-o abaixo. Basta clicar em validar e ver o resultado.">
    <meta property="og:url" content="{{ route('validate.cnpj') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
        Validar CNPJ
    </h1>

    <p class="mb-2 sm:mb-3">
        Você pode validar um CNPJ digitando-o abaixo. Basta clicar em validar e ver o resultado.
    </p>

    <a
        href="{{ route('generate.cnpj') }}"
        class="text-info hover:underline block mb-4 sm:mb-6"
        aria-label="Deseja gerar em vez validar?"
    >
        Deseja gerar em vez validar?
    </a>

    <div class="mt-6 mb-4 sm:mb-5">
        <div class="mb-3">
            <label for="cnpj" class="block mb-2">
                CNPJ
            </label>
            <div class="flex items-center mt-3">
                <input
                    id="cnpj"
                    class="w-[212px] bg-white dark:bg-a-dark p-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-700"
                    placeholder="000.000.000-00"
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

    @include('includes.articles.cnpj')

    @if (count($links) > 0)
        @component('components.links', ['links' => $links])
        @endcomponent
    @endif
@endsection

@vite('resources/ts/pages/validate.cnpj.ts')
