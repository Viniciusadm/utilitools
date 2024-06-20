@extends('layouts.app')

@section('title', 'Gerador de CNH')

@section('meta')
    <meta name="title" content="Gerador de CNH">
    <meta name="description" content="Gerador de CNH. Você pode gerar um ou mais CNHs válidos, basta clicar em gerar e copiar o CNH gerado.">
    <meta name="keywords" content="gerador de cnh, gerador de cnh online, gerador de cnh válido, gerador de cnh aleatório, gerador de cnh em massa, gerador de cnh em lote, gerador de muitos cnh">
    <meta property="og:title" content="Gerador de CNH">
    <meta property="og:description" content="Gerador de CNH. Você pode gerar um ou mais CNHs válidos, basta clicar em gerar e copiar o CNH gerado.">
    <meta property="og:url" content="{{ route('generate.cnh') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
        Gerador de CNH
    </h1>

    <p class="mb-2 sm:mb-3">
        Gerador de CNH.
        Basta clicar em gerar e copiar o CNH gerado.
    </p>

    <a
        href="{{ route('validate.cnh') }}"
        class="text-info hover:underline block mb-4 sm:mb-6"
        aria-label="Deseja validar em vez gerar?"
    >
        Deseja validar em vez gerar?
    </a>

    <div class="mb-2 sm:mb-3">
        <p class="mb-2 sm:mb-3">
            Separador?
        </p>
        <div class="flex gap-3">
            <div class="flex items-center">
                <input checked id="word-break" type="radio" value="word-break" name="separator" class="w-4 h-4">
                <label for="word-break" class="ml-2 text-sm font-medium">Quebra de linha</label>
            </div>
            <div class="flex items-center">
                <input id="comma" type="radio" value="2" name="separator" class="w-4 h-4">
                <label for="comma" class="ml-2 text-sm font-medium">Vírgula</label>
            </div>
        </div>
    </div>

    <label for="quantity" class="block mb-2 sm:mb-3">
        Quantidade
    </label>
    <input
        id="quantity"
        type="number"
        value="1"
        min="1"
        max="100"
        class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-2 sm:mb-3 w-full sm:w-80"
    />

    <div class="grid grid-cols-2 gap-3 w-full sm:w-80 mb-4 sm:mb-6" id="buttons">
        <button
            id="generate"
            class="text-white rounded-md px-4 py-2 bg-p-light dark:bg-p-dark hover:bg-p-light-light dark:hover:bg-p-dark-light block text-center"
            aria-label="Gerar CNH"
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

    <p>
        CNH(s) gerado
    </p>

    <div id="cnh" class="text-lg font-semibold mb-4 sm:mb-5">
        00000000000
    </div>

    @include('includes.articles.cnh')

    @component('components.warning')
        <span class="fw-bold">NOTA:</span> O gerador de CNH fornecido tem exclusivamente propósitos educacionais, destinando-se à avaliação de sites, softwares e outros.
        Os números são gerados aleatoriamente, respeitando as normas de formação do CNH. Não nos responsabilizamos por qualquer uso indevido.
        Caso identifique algum problema, agradecemos se entrar em contato conosco imediatamente.
    @endcomponent

    @if (count($links) > 0)
        @component('components.links', ['links' => $links])
        @endcomponent
    @endif
@endsection

@vite('resources/ts/pages/generate.cnh.ts')
