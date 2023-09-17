@extends('layouts.app')

@section('title', 'Conversor de bases numéricas')

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
            class="text-white rounded-md px-4 py-2 bg-p-light dark:bg-p-dark hover:bg-p-light-light dark:hover:bg-p-dark-light block text-center"
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
