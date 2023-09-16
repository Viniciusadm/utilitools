@extends('layouts.app')

@section('title', 'Gerador de CNPJ')

@section('meta')
    <meta name="title" content="Gerador de CNPJ">
    <meta name="description" content="Gerador de CNPJs válidos aleatórios. Você pode escolher se quer pontuação ou não e o estado.">
    <meta name="keywords" content="gerador de cnpj, gerador de cnpj online, gerador de cnpj válido, gerador de cnpj aleatório, gerador de cnpj com pontuação, gerador de cnpj com estado, gerador de muitos cnpjs, gerador de cnpj em massa, gerador de cnpj em lote, gerador de multiplos cnpjs">
    <meta property="og:title" content="Gerador de CNPJ">
    <meta property="og:description" content="Gerador de CNPJs válidos aleatórios. Você pode escolher se quer pontuação ou não.">
    <meta property="og:url" content="{{ route('generate.cnpj') }}">
@endsection

@section('content')
    <main class="p-4 bg-a-light dark:bg-a-dark rounded-lg mt-4 w-screen sm:w-content">
        <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
            Gerador de CNPJ
        </h1>

        <p class="mb-2 sm:mb-3">
            Gerador de CNPJs válidos aleatórios. Você pode escolher se quer pontuação ou não e o estado.
            Basta clicar em gerar e copiar o CNPJ gerado.
        </p>

        <a
            href="{{ route('validate.cpf') }}"
            class="text-info hover:underline block mb-4 sm:mb-6"
            aria-label="Deseja validar em vez gerar?"
        >
            Deseja validar em vez gerar?
        </a>

        <div class="mb-2 sm:mb-3">
            <p class="mb-2 sm:mb-3">
                Pontuação?
            </p>
            <div class="flex gap-3">
                <div class="flex items-center">
                    <input checked id="yes" type="radio" value="1" name="punctuation" class="w-4 h-4">
                    <label for="yes" class="ml-2 text-sm font-medium">Sim</label>
                </div>
                <div class="flex items-center">
                    <input id="no" type="radio" value="2" name="punctuation" class="w-4 h-4">
                    <label for="no" class="ml-2 text-sm font-medium">Não</label>
                </div>
            </div>
        </div>

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
            oninput="this.value = minMax(this.value, 1, 100)"
        />

        <div class="grid grid-cols-2 gap-3 w-full sm:w-80 mb-4 sm:mb-6" id="buttons">
            <button
                id="generate"
                class="text-white rounded-md px-4 py-2 bg-p-light dark:bg-p-dark hover:bg-p-light-light dark:hover:bg-p-dark-light block text-center"
                aria-label="Gerar CNPJ"
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

        <p>
            CNPJ(s) gerado
        </p>

        <div id="cnpj" class="text-lg font-semibold mb-2 sm:mb-3">
            00.000.000/0000-00
        </div>
    </main>
@endsection

@vite('resources/ts/utils/cnpj.ts')
