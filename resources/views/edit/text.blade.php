@extends('layouts.app')

@section('title', 'Editor de texto')

@section('content')
    <main class="p-4 bg-a-light dark:bg-a-dark rounded-lg mt-4 w-screen sm:w-content">
        <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
            Editor de texto
        </h1>

        <label for="text" class="block mb-2 sm:mb-3">
            Digite ou cole o texto que deseja editar
        </label>

        <div class="mb-2 sm:mb-3 flex flex-wrap gap-2 sm:gap-3">
            <button
                id="action-reverse"
                class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5"
            >
                Inverter texto
            </button>
            <button
                id="action-uppercase"
                class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5"
            >
                Maiúsculas
            </button>
            <button
                id="action-lowercase"
                class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5"
            >
                Minúsculas
            </button>
            <button
                id="action-capitalize"
                class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5"
            >
                Capitalizar
            </button>
            <button
                id="action-alternate"
                class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5"
            >
                Alternar caixa
            </button>
            <button
                id="action-shuffle"
                class="bg-h-light dark:bg-h-dark text-white dark:text-black rounded-lg p-2 sm:p-2.5"
            >
                Embaralhar
            </button>
        </div>
        <textarea
            id="text"
            class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-2 sm:mb-3 w-full resize-none"
            rows="15"
        ></textarea>
        <p id="status">
            <span class="font-bold" id="status-characters">0</span> caracteres
            <span class="font-bold" id="status-words">0</span> palavras
            <span class="font-bold" id="status-lines">0</span> linhas
        </p>
    </main>
@endsection

@vite('resources/js/utils/text.js')
