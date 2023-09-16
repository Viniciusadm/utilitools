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

@section('scripts')
    <script>
        const text = document.querySelector('#text');
        const statusLength = document.querySelector('#status-characters');
        const statusWords = document.querySelector('#status-words');
        const statusLines = document.querySelector('#status-lines');

        text.addEventListener('input', () => {
            const analyzed = analyze(text.value);
            statusLength.textContent = analyzed.characters;
            statusWords.textContent = analyzed.words;
            statusLines.textContent = analyzed.lines;
        });
    </script>
@endsection
