@extends('layouts.app')

@section('title', 'Validar CNH')

@section('meta')
    <meta name="title" content="Validar CNH">
    <meta name="description" content="Validador de CNHs. Você pode validar um CNH digitando-o abaixo. Basta clicar em validar e ver o resultado.">
    <meta name="keywords" content="validar cnh, validar cnh online">
    <meta property="og:title" content="Validar CNH">
    <meta property="og:description" content="Validador de CNHs. Você pode validar um CNH digitando-o abaixo. Basta clicar em validar e ver o resultado.">
    <meta property="og:url" content="{{ route('validate.cnh') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
        Validar CNH
    </h1>

    <p class="mb-2 sm:mb-3">
        Você pode validar um CNH digitando-o abaixo. Basta clicar em validar e ver o resultado.
    </p>

    <a
        href="{{ route('generate.cnh') }}"
        class="text-info hover:underline block mb-4 sm:mb-6"
        aria-label="Deseja gerar em vez validar?"
    >
        Deseja gerar em vez validar?
    </a>

    <div class="mt-6 mb-4 sm:mb-5">
        <div class="mb-3">
            <label for="cnh" class="block mb-2">
                CNH
            </label>
            <div class="flex items-center mt-3">
                <input
                    id="cnh"
                    class="w-[212px] bg-white dark:bg-a-dark p-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-700"
                    placeholder="00000000000"
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

    @include('includes.articles.cnh')

    @if (count($links) > 0)
        @component('components.links', ['links' => $links])
        @endcomponent
    @endif
@endsection

@vite('resources/ts/pages/validate.cnh.ts')
