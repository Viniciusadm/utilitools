@extends('layouts.app')

@section('title', 'Calculadora de regra de três')

@section('meta')
    <meta name="title" content="Calculadora de regra de três">
    <meta name="description" content="Calculadora de regra de três. Basta digitar os valores que o cálculo será feito. O resultado será o valor da regra de três.">
    <meta name="keywords" content="calculadora, regra de três, regra, três, calculadora de regra de três, calculadora de regra de 3, calculadora de regra de três online, calculadora de regra de 3 online, calculadora de regra de três online grátis, calculadora de regra de 3 online grátis, calculadora de regra de três online free, calculadora de regra de 3 online free, calculadora de regra de três online gratuita, calculadora de regra de 3 online gratuita">
    <meta property="og:title" content="Calculadora de regra de três">
    <meta property="og:description" content="Calculadora de regra de três. Basta digitar os valores que o cálculo será feito. O resultado será o valor da regra de três.">
    <meta property="og:url" content="{{ route('calculate.three') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-3 sm:mb-4">
        Calculadora de regra de três
    </h1>

    <p class="mb-3 sm:mb-4">
        Calculadora de regra de três. Basta digitar os valores que o cálculo será feito. O resultado será o valor da regra de três.
    </p>

    <div class="flex mb-3 sm:mb-4 gap-3 items-end">
        <div>
            <div class="flex gap-3 mb-2 sm:mb-3">
                <label class="block mb-2 sm:mb-3">
                    <input
                        id="number_a"
                        type="number"
                        placeholder="A"
                        class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark w-full md:w-auto text-center number"
                    />
                </label>

                <label class="block">
                    <input
                        id="number_b"
                        type="number"
                        placeholder="B"
                        class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark w-full md:w-auto text-center number"
                    />
                </label>
            </div>

            <div class="flex gap-3">
                <label class="block">
                    <input
                        id="number_c"
                        type="number"
                        placeholder="C"
                        class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark w-full md:w-auto text-center number"
                    />
                </label>

                <label class="block">
                    <input
                        id="number_x"
                        value="X"
                        disabled
                        class="border rounded-lg block p-2 sm:p-2.5 w-full md:w-auto text-center text-white border-p-light bg-p-light dark:border-p-dark dark:bg-p-dark"
                    />
                </label>
            </div>
        </div>

        <button
            class="bg-a-light dark:bg-a-dark text-white dark:text-black p-2 rounded-md shadow-sm border copy-button"
            data-clipboard-target="#number_x"
            id="copy"
            aria-label="Copiar o valor calculado"
        >
            <i class="bi-clipboard"></i>
        </button>
    </div>

    @if (count($links) > 0)
        @component('components.links', ['links' => $links])
        @endcomponent
    @endif
@endsection

@vite('resources/ts/pages/calculate.three.ts')
