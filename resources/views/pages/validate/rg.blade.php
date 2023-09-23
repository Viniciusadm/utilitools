@extends('layouts.app')

@section('title', 'Validar RG - SSP/SP')

@section('meta')
    <meta name="title" content="Validar RG - SSP/SP">
    <meta name="description" content="Validador de RGs. Você pode validar um ou mais RGs digitando-os abaixo. Basta clicar em validar e ver o resultado.">
    <meta name="keywords" content="validar rg, validar rg online">
    <meta property="og:title" content="Validar RG - SSP/SP">
    <meta property="og:description" content="Validador de RGs. Você pode validar um ou mais RGs digitando-os abaixo. Basta clicar em validar e ver o resultado.">
    <meta property="og:url" content="{{ route('validate.rg') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
        Validar RG - SSP/SP
    </h1>

    <p class="mb-2 sm:mb-3">
        Você pode validar um ou mais RGs digitando-os abaixo. Basta clicar em validar e ver o resultado.
    </p>

    <a
        href="{{ route('generate.rg') }}"
        class="text-info hover:underline block mb-4 sm:mb-6"
        aria-label="Deseja gerar em vez validar?"
    >
        Deseja gerar em vez validar?
    </a>

    <div class="mt-6 mb-4 sm:mb-5">
        <div class="mb-3">
            <label for="rg" class="block mb-2">
                RG
            </label>
            <div class="flex items-center mt-3">
                <input
                    id="rg"
                    class="w-[212px] bg-white dark:bg-a-dark p-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-700"
                    placeholder="00.000.000-0"
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

    @include('includes.articles.rg')

    @if (count($links) > 0)
        @component('components.links', ['links' => $links])
        @endcomponent
    @endif
@endsection

@vite('resources/ts/pages/validate.rg.ts')
