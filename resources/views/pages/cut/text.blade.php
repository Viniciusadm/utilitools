@extends('layouts.app')

@section('title', 'Cortar texto')

@section('meta')
    <meta name="title" content="Cortar texto">
    <meta name="description" content="Cortar texto online. Ferramenta para cortar textos e adicionar reticências.">
    <meta name="keywords" content="cortar texto, cortar textos, cortar texto online, cortar textos online, cortar texto com reticências, cortar textos com reticências, cortar texto com reticências online, cortar textos com reticências online, cortar texto com reticências online grátis, cortar textos com reticências online grátis, cortar texto com reticências grátis, cortar textos com reticências grátis, cortar texto com reticências grátis online, cortar textos com reticências grátis online, cortar texto com reticências online free, cortar textos com reticências online free, cortar texto com reticências free, cortar textos com reticências free, cortar texto com reticências free online, cortar textos com reticências free online, cortar texto com reticências online gratuito, cortar textos com reticências online gratuito, cortar texto com reticências gratuito, cortar textos com reticências gratuito, cortar texto com reticências gratuito online, cortar textos com reticências gratuito online">
    <meta property="og:title" content="Cortar texto">
    <meta property="og:description" content="Cortar texto online. Ferramenta para cortar textos e adicionar reticências.">
    <meta property="og:url" content="{{ route('cut.text') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
        Cortar texto
    </h1>

    <label for="text" class="block mb-2 sm:mb-3" id="text-label">
        Digite ou cole o texto que deseja cortar
    </label>

    <textarea
        id="text"
        class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-3 sm:mb-4 w-full resize-none"
        rows="9"
        aria-labelledby="text-label"
    ></textarea>

    <label for="quantity" class="block mb-2 sm:mb-3" id="quantity-label">
        Máximo de caracteres
    </label>

    <input
        id="quantity"
        class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-5 sm:mb-6 w-full"
        type="text"
        placeholder="Digite o máximo de caracteres"
        aria-label="Digite o máximo de caracteres"
        value="20"
    />

    <div class="flex items-center mb-4 sm:mb-5">
        <input checked id="ellipsis" type="checkbox" name="ellipsis" class="w-4 h-4">
        <label for="ellipsis" class="ml-2 text-sm font-medium">Adicionar reticências</label>
    </div>

    <div class="flex items-center justify-center my-6 lg:mb-0 gap-3">
        <button
            id="cut"
            class="text-white rounded-md px-4 py-2 bg-p-light dark:bg-p-dark hover:bg-p-light-light dark:hover:bg-p-dark-light block text-center w-full sm:w-40"
            aria-label="Cortar texto"
        >
            Cortar texto
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

@vite('resources/ts/pages/cut.text.ts')
