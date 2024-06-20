@extends('layouts.app')

@section('title', 'Gerador de Lorem Ipsum')

@section('meta')
    <meta name="title" content="Gerador de Lorem Ipsum">
    <meta name="description" content="Gerador de Lorem Ipsum online. Ferramenta para gerar textos Lorem Ipsum. É possível escolher os parágrafos, palavras e até a quantidade de caracteres.">
    <meta name="keywords" content="gerador de lorem ipsum, gerador de lorem, gerador de ipsum, gerador de texto, gerador de texto aleatório, gerador de texto online, gerador de texto lorem ipsum, gerador de texto aleatório, gerador de texto aleatório online, gerador de texto aleatório lorem ipsum, gerador de texto aleatório lorem, gerador de texto aleatório ipsum, gerador de texto aleatório online lorem ipsum, gerador de texto aleatório online lorem, gerador de texto aleatório online ipsum, gerador de texto lorem ipsum online, gerador de texto lorem online, gerador de texto ipsum online, gerador de texto lorem ipsum aleatório, gerador de texto lorem aleatório, gerador de texto ipsum aleatório, gerador de texto lorem ipsum aleatório online, gerador de texto lorem aleatório online, gerador de texto ipsum aleatório online">
    <meta property="og:title" content="Gerador de Lorem Ipsum">
    <meta property="og:description" content="Gerador de Lorem Ipsum online. Ferramenta para gerar textos Lorem Ipsum. É possível escolher os parágrafos, palavras e até a quantidade de caracteres.">
    <meta property="og:url" content="{{ route('generate.lorem') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
        Gerador de Lorem Ipsum
    </h1>

    <p class="mb-2 sm:mb-3">
        Gerador de Lorem Ipsum online. Ferramenta para gerar textos Lorem Ipsum.
        É possível escolher os parágrafos, palavras e até a quantidade de caracteres.
    </p>

    <div class="mb-2 sm:mb-3">
        <label for="quantity" class="block mb-2 sm:mb-3">
            Gerar
        </label>
        <input
            id="quantity"
            type="number"
            value="5"
            class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-3 sm:mb-4 w-full md:w-auto"
        />

        <div class="flex gap-3 flex-wrap">
            <div class="flex items-center">
                <input checked id="paragraphs" type="radio" value="paragraphs" name="type" class="w-4 h-4">
                <label for="paragraphs" class="ml-2 text-sm font-medium">Parágrafos</label>
            </div>
            <div class="flex items-center">
                <input id="words" type="radio" value="words" name="type" class="w-4 h-4">
                <label for="words" class="ml-2 text-sm font-medium">Palavras</label>
            </div>
            <div class="flex items-center">
                <input id="bytes" type="radio" value="bytes" name="type" class="w-4 h-4">
                <label for="bytes" class="ml-2 text-sm font-medium">Bytes</label>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-2 gap-3 w-full sm:w-80 my-6" id="buttons">
        <button
            id="generate"
            class="text-white rounded-md px-4 py-2 bg-p-light dark:bg-p-dark hover:bg-p-light-light dark:hover:bg-p-dark-light block text-center"
            aria-label="Gerar"
        >
            Gerar
        </button>

        <button
            id="copy"
            class="text-t-light dark:text-white bg-transparent rounded-md h-10 px-4 border dark:t-light dark:border-white flex items-center justify-center"
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
        rows="15"
        aria-labelledby="result-label"
        readonly
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

@vite('resources/ts/pages/generate.lorem.ts')
