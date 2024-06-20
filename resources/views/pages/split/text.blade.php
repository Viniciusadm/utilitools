@extends('layouts.app')

@section('title', 'Dividir texto')

@section('meta')
    <meta name="title" content="Dividir texto">
    <meta name="description" content="Dividir texto online. Ferramenta para dividir textos em linhas, palavras, caracteres.">
    <meta name="keywords" content="dividir texto, dividir linhas, dividir palavras, dividir caracteres, dividir strings">
    <meta property="og:title" content="Dividir texto">
    <meta property="og:description" content="Dividir texto online. Ferramenta para dividir textos em linhas, palavras, caracteres.">
    <meta property="og:url" content="{{ route('split.text') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
        Dividir texto
    </h1>

    <label for="text" class="block mb-2 sm:mb-3" id="text-label">
        Digite ou cole o texto que deseja dividir
    </label>

    <textarea
        id="text"
        class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-3 sm:mb-4 w-full resize-none"
        rows="9"
        aria-labelledby="text-label"
    ></textarea>

    <label for="separator" class="block mb-3 sm:mb-4" id="separator-label">
        Digite o separador que deseja usar
    </label>

    <input
        id="separator"
        class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-2 sm:mb-3 w-full"
        type="text"
        placeholder="Separador"
        aria-label="Separador"
    />

    <div class="flex items-center justify-center my-6 lg:mb-0 gap-3">
        <button
            id="split"
            class="text-white rounded-md px-4 py-2 bg-p-light dark:bg-p-dark hover:bg-p-light-light dark:hover:bg-p-dark-light block text-center w-full sm:w-40"
            aria-label="Dividir texto"
        >
            Dividir texto
        </button>

        <button
            id="copy"
            class="text-t-light dark:text-white bg-transparent rounded-md h-10 px-4 border dark:t-light dark:border-white flex items-center justify-center flex items-center justify-centerw-full sm:w-40"
            aria-label="Copiar"
        >
            <span class="mr-1">Copiar</span>
            <img src="{{ asset('images/icons/clipboard.svg') }}" alt="">
        </button>
    </div>

    <label for="result" class="block mb-2 sm:mb-3" id="result-label">
        Resultado
    </label>

    <textarea
        id="result"
        class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-2 sm:mb-3 w-full resize-none"
        rows="9"
        aria-labelledby="result-label"
        readonly
    ></textarea>

    @if (count($links) > 0)
        @component('components.links', ['links' => $links])
        @endcomponent
    @endif
@endsection

@vite('resources/ts/pages/split.text.ts')
