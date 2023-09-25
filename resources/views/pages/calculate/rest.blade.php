@extends('layouts.app')

@section('title', 'Calculadora de resto')

@section('meta')
    <meta name="title" content="Calculadora de resto">
    <meta name="description" content="Calculadora de resto. Basta digitar o dividendo e o divisor e clicar em calcular. O resultado será o quociente e o resto da divisão, além da porcentagem do resto sobre o dividendo.">
    <meta name="keywords" content="">
    <meta property="og:title" content="Calculadora de resto">
    <meta property="og:description" content="Calculadora de resto. Basta digitar o dividendo e o divisor e clicar em calcular. O resultado será o quociente e o resto da divisão, além da porcentagem do resto sobre o dividendo.">
    <meta property="og:url" content="{{ route('calculate.rest') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-3 sm:mb-4">
        Calculadora de resto
    </h1>

    <p class="mb-3 sm:mb-4">
        Calculadora de resto. Basta digitar o dividendo e o divisor e clicar em calcular. O resultado será o quociente e o resto da divisão, além da porcentagem do resto sobre o dividendo.
    </p>

    <div class="flex gap-4 mb-2 sm:mb-3 flex-col md:flex-row flex-wrap">
        <div>
            <label for="divident" class="block mb-2 sm:mb-3">
                Dividendo
            </label>
            <input
                id="divident"
                type="number"
                value="8"
                class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-2 sm:mb-3 w-full md:w-auto"
            />
        </div>

        <div>
            <label for="divisor" class="block mb-2 sm:mb-3">
                Divisor
            </label>
            <input
                id="divisor"
                type="number"
                value="3"
                class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-2 sm:mb-3 w-full md:w-auto"
            />
        </div>
    </div>

    <button
        id="calculate"
        class="w-full sm:w-40 text-white rounded-md px-4 py-2 bg-p-light dark:bg-p-dark hover:bg-p-light-light dark:hover:bg-p-dark-light block text-center disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Calcular"
    >
        Calcular
    </button>

    <div class="mt-4 sm:mt-6 mb-2 sm:mb-3">
        <div id="result">
            <p class="font-semibold">
                Quociente: <span id="result-quociente"></span>
            </p>
            <p class="font-semibold">
                Resto: <span id="result-rest"></span>
            </p>
            <p class="font-semibold">
                Porcentagem do resto sobre o dividendo: <span id="result-percentage"></span>
            </p>
        </div>
    </div>

    @if (count($links) > 0)
        @component('components.links', ['links' => $links])
        @endcomponent
    @endif
@endsection

@vite('resources/ts/pages/calculate.rest.ts')
