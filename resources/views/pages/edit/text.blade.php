@extends('layouts.app')

@section('title', 'Editor de texto')

@section('meta')
    <meta name="title" content="Editor de texto">
    <meta name="description" content="Editor de texto online. Ferramenta para editar textos, inverter, maiúsculas, minúsculas, capitalizar, alternar caixa, embaralhar e remover duplicados.">
    <meta name="keywords" content="editor de texto, inverter texto, maiúsculas, minúsculas, capitalizar, alternar caixa, embaralhar, remover duplicados">
    <meta property="og:title" content="Editor de texto">
    <meta property="og:description" content="Editor de texto online. Ferramenta para editar textos, inverter, maiúsculas, minúsculas, capitalizar, alternar caixa, embaralhar e remover duplicados.">
    <meta property="og:url" content="{{ route('edit.text') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
        Editor de texto
    </h1>

    <label for="text" class="block mb-2 sm:mb-3" id="text-label">
        Digite ou cole o texto que deseja editar
    </label>

    <div class="mb-2 sm:mb-3 flex flex-wrap gap-2 sm:gap-3">
        <button
            id="action-reverse"
            class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5"
            aria-label="Inverter texto"
        >
            Inverter texto
        </button>
        <button
            id="action-uppercase"
            class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5"
            aria-label="Maiúsculas"
        >
            Maiúsculas
        </button>
        <button
            id="action-lowercase"
            class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5"
            aria-label="Minúsculas"
        >
            Minúsculas
        </button>
        <button
            id="action-capitalize"
            class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5"
            aria-label="Capitalizar"
        >
            Capitalizar
        </button>
        <button
            id="action-alternate"
            class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5"
            aria-label="Alternar caixa"
        >
            Alternar caixa
        </button>
        <button
            id="action-shuffle"
            class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5"
            aria-label="Embaralhar"
        >
            Embaralhar
        </button>

        <button
            id="action-unique"
            class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5"
            aria-label="Remover duplicados"
        >
            Remover duplicados
        </button>

        <button
            id="action-undo"
            class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5 flex items-center"
            aria-label="Desfazer"
        >
            <img src="{{ asset('images/icons/arrow-counterclockwise.svg') }}" class="me-1" alt="">
            Desfazer
        </button>
    </div>

    <textarea
        id="text"
        class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-2 sm:mb-3 w-full resize-none"
        rows="15"
        aria-labelledby="text-label"
        aria-describedby="status"
    ></textarea>

    <p id="status" class="mb-2 sm:mb-3">
        <span class="font-bold" id="status-characters">0</span> caracteres
        <span class="font-bold" id="status-words">0</span> palavras
        <span class="font-bold" id="status-lines">0</span> linhas
    </p>

    @if (count($links) > 0)
        @component('components.links', ['links' => $links])
        @endcomponent
    @endif
@endsection

@vite('resources/ts/pages/edit.text.ts')
