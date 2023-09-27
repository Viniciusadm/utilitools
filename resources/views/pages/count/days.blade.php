@extends('layouts.app')

@section('title', 'Contar dias')

@section('meta')
    <meta name="title" content="Contar dias">
    <meta name="description" content="Contar dias. Basta digitar a data inicial e a data final e clicar em calcular. O resultado será a quantidade de dias entre as duas datas.">
    <meta name="keywords" content="contar dias, contar dias entre datas, contar dias entre duas datas, contar dias entre duas datas online, contar dias entre duas datas online grátis, contar dias entre duas datas online gratuito, contador de dias, contador de dias entre datas, contador de dias entre duas datas, contador de dias entre duas datas online, contador de dias entre duas datas online grátis, contador de dias entre duas datas online gratuito">
    <meta property="og:title" content="Contar dias">
    <meta property="og:description" content="Contar dias. Basta digitar a data inicial e a data final e clicar em calcular. O resultado será a quantidade de dias entre as duas datas.">
    <meta property="og:url" content="{{ route('count.days') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-3 sm:mb-4">
        Contar dias
    </h1>

    <p class="mb-3 sm:mb-4">
        Contar dias. Basta digitar a data inicial e a data final e clicar em calcular. O resultado será a quantidade de dias entre as duas datas.
    </p>

    <div class="flex gap-4 mb-2 sm:mb-3 flex-col md:flex-row flex-wrap">
        <div>
            <label for="initial" class="block mb-2 sm:mb-3">
                Data inicial
            </label>
            <input
                id="initial"
                type="date"
                value="{{ Carbon\Carbon::now()->subDays(7)->format('Y-m-d') }}"
                class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-2 sm:mb-3 w-full md:w-auto"
            />
        </div>

        <div>
            <label for="final" class="block mb-2 sm:mb-3">
                Data final
            </label>
            <input
                id="final"
                type="date"
                value="{{ Carbon\Carbon::now()->format('Y-m-d') }}"
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

    <p class="font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">
        Resultado: <span id="result-days">7 dias</span>
    </p>

    @if (count($links) > 0)
        @component('components.links', ['links' => $links])
        @endcomponent
    @endif
@endsection

@vite('resources/ts/pages/count.days.ts')
