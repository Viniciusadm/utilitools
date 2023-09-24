@extends('layouts.app')

@section('title', 'Remover acentos')

@section('meta')
    <meta name="title" content="Remover acentos">
    <meta name="description" content="Remover acentos online. Ferramenta para remover acentos de textos.">
    <meta name="keywords" content="remover acentos, remover acentuação, remover acentos de textos, remover acentuação de textos">
    <meta property="og:title" content="Remover acentos">
    <meta property="og:description" content="Remover acentos online. Ferramenta para remover acentos de textos.">
    <meta property="og:url" content="{{ route('remove.accents') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
        Remover acentos
    </h1>

    <label for="text" class="block mb-2 sm:mb-3" id="text-label">
        Digite ou cole o texto que deseja remover os acentos
    </label>

    <textarea
        id="text"
        class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-3 sm:mb-4 w-full resize-none"
        rows="9"
        aria-labelledby="text-label"
    ></textarea>

    <div class="flex items-center justify-center my-6 lg:mb-0 gap-3">
        <button
            id="remove"
            class="text-white rounded-md px-4 py-2 bg-p-light dark:bg-p-dark hover:bg-p-light-light dark:hover:bg-p-dark-light block text-center w-full sm:w-40"
            aria-label="Remover"
        >
            Remover
        </button>

        <button
            id="copy"
            class="text-t-light dark:text-white bg-transparent rounded-md h-10 px-4 border dark:t-light dark:border-white w-full sm:w-40"
            aria-label="Copiar"
        >
            <span class="mr-1">Copiar</span>
            <i class="bi-clipboard"></i>
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

@vite('resources/ts/pages/remove.accents.ts')
