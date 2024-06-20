@extends('layouts.app')

@section('title', 'Gerador de nomes')

@section('meta')
    <meta name="title" content="Gerador de nomes">
    <meta name="description" content="Gerador de nomes completos aleatórios. Você pode escolher o gênero.">
    <meta name="keywords" content="gerador de nomes, gerador de nomes online, gerador de nomes aleatórios, gerador de nomes completos, gerador de nomes com gênero, gerador de nomes com sexo, gerador de nomes">
    <meta property="og:title" content="Gerador de nomes">
    <meta property="og:description" content="Gerador de nomes completos aleatórios. Você pode escolher o gênero.">
    <meta property="og:url" content="{{ route('generate.names') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
        Gerador de nomes
    </h1>

    <p class="mb-2 sm:mb-3">
        Gerador de nomes completos aleatórios. Você pode escolher o gênero.
        Basta clicar em gerar e copiar o nome gerado.
    </p>

    <div class="mb-2 sm:mb-3">
        <p class="mb-2 sm:mb-3">
            Gênero
        </p>
        <div class="flex gap-3">
            <div class="flex items-center">
                <input checked id="male" type="radio" value="male" name="genre" class="w-4 h-4">
                <label for="male" class="ml-2 text-sm font-medium">Masculino</label>
            </div>
            <div class="flex items-center">
                <input id="female" type="radio" value="female" name="genre" class="w-4 h-4">
                <label for="female" class="ml-2 text-sm font-medium">Feminino</label>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-2 gap-3 w-full sm:w-80 mb-4 sm:mb-6" id="buttons">
        <button
            id="generate"
            class="text-white rounded-md px-4 py-2 bg-p-light dark:bg-p-dark hover:bg-p-light-light dark:hover:bg-p-dark-light block text-center disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Gerar CNPJ"
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

    <div id="name" class="text-lg font-semibold mb-4 sm:mb-5">
        Nome gerado: <span id="name-text"></span>
    </div>

    @if (count($links) > 0)
        @component('components.links', ['links' => $links])
        @endcomponent
    @endif
@endsection

@vite('resources/ts/pages/generate.names.ts')
