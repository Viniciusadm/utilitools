@extends('layouts.app')

@section('title', 'Editor de palavras')

@section('meta')
    <meta name="title" content="Editor de palavras">
    <meta name="description" content="Editor de palavras online. Ferramenta para ordernar palavras, remover duplicados e contar palavras.">
    <meta name="keywords" content="editor de palavras, ordernar palavras, remover duplicados, contar palavras">
    <meta property="og:title" content="Editor de palavras">
    <meta property="og:description" content="Editor de palavras online. Ferramenta para ordernar palavras, remover duplicados e contar palavras.">
    <meta property="og:url" content="{{ route('edit.words') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
        Editor de palavras
    </h1>

    <label for="text" class="block mb-2 sm:mb-3" id="text-label">
        Digite ou cole as palavras que deseja editar
    </label>

    <div class="mb-4 sm:mb-5 flex flex-wrap gap-2 sm:gap-3">
        <button
            id="action-sort"
            class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5"
            aria-label="Ordernar palavras"
        >
            Ordernar palavras
        </button>

        <button
            id="action-reverse"
            class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5"
            aria-label="Inverter palavras"
        >
            Inverter palavras
        </button>

        <button
            id="action-unique"
            class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5"
            aria-label="Remover duplicados"
        >
            Remover duplicados
        </button>

        <button
            id="action-shuffle"
            class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5"
            aria-label="Embaralhar"
        >
            Embaralhar
        </button>

        <button
            id="action-undo"
            class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5"
            aria-label="Desfazer"
        >
            <i class="bi bi-arrow-counterclockwise"></i>
            Desfazer
        </button>
    </div>

    <div class="mb-4 sm:mb-5 gap-2 sm:gap-3">
        <p>
            Separador?
        </p>
        <div class="flex flex-wrap gap-3">
            <div class="flex items-center">
                <input checked id="space" type="radio" value="space" name="separator" class="w-4 h-4">
                <label for="space" class="ml-2 text-sm font-medium">Espaço</label>
            </div>
            <div class="flex items-center">
                <input id="word-break" type="radio" value="word-break" name="separator" class="w-4 h-4">
                <label for="word-break" class="ml-2 text-sm font-medium">Quebra de linha</label>
            </div>
            <div class="flex items-center">
                <input id="comma" type="radio" value="comma" name="separator" class="w-4 h-4">
                <label for="comma" class="ml-2 text-sm font-medium">Vírgula</label>
            </div>
            <div class="flex items-center">
                <input id="semicolon" type="radio" value="semicolon" name="separator" class="w-4 h-4">
                <label for="semicolon" class="ml-2 text-sm font-medium">Ponto e vírgula</label>
            </div>
        </div>
    </div>

    <textarea
        id="text"
        class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-2 sm:mb-3 w-full resize-none"
        rows="15"
        aria-labelledby="text-label"
        aria-describedby="status"
    ></textarea>

    <p id="status" class="mb-2 sm:mb-3">
        <span class="font-bold" id="status-words">0</span> palavras
    </p>

    @if (count($links) > 0)
        @component('components.links', ['links' => $links])
        @endcomponent
    @endif
@endsection

@vite('resources/ts/pages/edit.words.ts')
