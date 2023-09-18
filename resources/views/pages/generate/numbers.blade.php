@extends('layouts.app')

@section('title', 'Gerador de números aleatórios')

@section('meta')
    <meta name="title" content="Gerador de números aleatórios">
    <meta name="description" content="Gerador de números aleatórios. Você pode escolher o mínimo, o máximo e a quantidade de números.">
    <meta name="keywords" content="gerador de números, gerador de números aleatórios, gerador de números aleatórios online, gerador de números aleatórios com mínimo, gerador de números aleatórios com máximo, gerador de números aleatórios com quantidade, gerador de números aleatórios com min, gerador de números aleatórios com max, gerador de números aleatórios com qtd, gerador de números aleatórios com quantidade, gerador de números aleatórios com quantidade, gerador de números aleatórios com minimo, gerador de números aleatórios com maximo, gerador de números aleatórios com qtd, gerador de números aleatórios com quantidade, gerador de números aleatórios com minimo, gerador de números aleatórios com maximo, gerador de números aleatórios com qtd, gerador de números aleatórios com quantidade, gerador de números aleatórios com minimo, gerador de números aleatórios com maximo, gerador de números aleatórios com qtd, gerador de números aleatórios com quantidade">
    <meta property="og:title" content="Gerador de números aleatórios">
    <meta property="og:description" content="Gerador de números aleatórios. Você pode escolher o mínimo, o máximo e a quantidade de números.">
    <meta property="og:url" content="{{ route('site.generate.numbers') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-3 sm:mb-4">
        Gerador de números aleatórios
    </h1>

    <p class="mb-3 sm:mb-4">
        Gerador de números aleatórios. Você pode escolher o mínimo, o máximo e a quantidade de números.
    </p>

    <div class="flex gap-4 mb-2 sm:mb-3 flex-col md:flex-row flex-wrap">
        <div>
            <label for="min" class="block mb-2 sm:mb-3">
                Mínimo
            </label>
            <input
                id="min"
                type="number"
                value="1"
                class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-2 sm:mb-3 w-full md:w-auto"
            />
        </div>

        <div>
            <label for="max" class="block mb-2 sm:mb-3">
                Máximo
            </label>
            <input
                id="max"
                type="number"
                value="100"
                class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-2 sm:mb-3 w-full md:w-auto"
            />
        </div>

        <div>
            <label for="quantity" class="block mb-2 sm:mb-3">
                Quantidade
            </label>
            <input
                id="quantity"
                type="number"
                value="1"
                class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-2 sm:mb-3 w-full md:w-auto"
            />
        </div>
    </div>

    <div class="grid grid-cols-2 gap-3 w-full sm:w-80 mb-4 sm:mb-6" id="buttons">
        <button
            id="generate"
            class="text-white rounded-md px-4 py-2 bg-p-light dark:bg-p-dark hover:bg-p-light-light dark:hover:bg-p-dark-light block text-center disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Gerar números"
        >
            Gerar
        </button>

        <button
            id="copy"
            class="text-t-light dark:text-white bg-transparent rounded-md h-10 px-4 border dark:t-light dark:border-white"
            aria-label="Copiar"
        >
            <span class="mr-1">Copiar</span>
            <i class="bi-clipboard"></i>
        </button>
    </div>

    <div class="mt-4 sm:mt-6">
        <p class="block mb-2 sm:mb-3">
            Resultado
        </p>
        <div id="result"></div>
    </div>
@endsection

@vite('resources/ts/utils/numbers.ts')
