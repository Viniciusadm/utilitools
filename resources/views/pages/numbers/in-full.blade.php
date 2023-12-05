@extends('layouts.app')

@section('title', 'Número por Extenso')

@section('meta')
    <meta name="title" content="Número por Extenso">
    <meta name="description" content="Número por Extenso online. Ferramenta para escrever um número por extenso.">
    <meta name="keywords" content="número por extenso, escrever número por extenso, escrever número por extenso online, escrever número por extenso online grátis, escrever número por extenso online gratuito, escrever número por extenso online de graça, escrever número por extenso grátis, escrever número por extenso gratuito, escrever número por extenso de graça, escrever número por extenso em português, escrever número por extenso em português online, escrever número por extenso em português online grátis, escrever número por extenso em português online gratuito, escrever número por extenso em português online de graça, escrever número por extenso em português grátis, escrever número por extenso em português gratuito, escrever número por extenso em português de graça">
    <meta property="og:title" content="Número por Extenso">
    <meta property="og:description" content="Número por Extenso online. Ferramenta para escrever um número por extenso.">
    <meta property="og:url" content="{{ route('numbers.in-full') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
        Número por Extenso
    </h1>

    <label for="number" class="block mb-2 sm:mb-3" id="number-label">
        Número a ser escrito por extenso
    </label>

    <input
        id="number"
        class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-5 sm:mb-6 w-full"
        type="number"
        placeholder="Digite ou cole o número que deseja escrever por extenso"
        aria-label="Número a ser escrito por extenso"
    />

    <div class="flex items-center justify-center my-6 lg:mb-0 gap-3 w-80 sm:w-auto flex-col sm:flex-row">
        <button
            id="in-full"
            class="text-white rounded-md px-4 py-2 bg-p-light dark:bg-p-dark hover:bg-p-light-light dark:hover:bg-p-dark-light block text-center w-full sm:w-60"
            aria-label="Escrever por extenso"
        >
            Escrever por extenso
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
        rows="5"
        aria-labelledby="result-label"
        readonly
    ></textarea>

    @if (count($links) > 0)
        @component('components.links', ['links' => $links])
        @endcomponent
    @endif
@endsection

@vite('resources/ts/pages/numbers.in-full.ts')
