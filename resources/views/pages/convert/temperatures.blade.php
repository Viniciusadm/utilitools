@extends('layouts.app')

@section('title', 'Conversor de bases numéricas')

@section('meta')
    <meta name="title" content="Conversor de temperaturas">
    <meta name="description" content="Conversor de temperaturas. Digite um valor em qualquer unidade de temperatura e veja sua conversão para as demais unidades. As unidades disponíveis são: Celsius, Fahrenheit, Kelvin.">
    <meta name="keywords" content="conversor, temperatura, celsius, fahrenheit, kelvin">
    <meta property="og:title" content="Conversor de temperaturas">
    <meta property="og:description" content="Conversor de temperaturas. Digite um valor em qualquer unidade de temperatura e veja sua conversão para as demais unidades. As unidades disponíveis são: Celsius, Fahrenheit, Kelvin.">
    <meta property="og:url" content="{{ route('site.convert.temperatures') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-3 sm:mb-4">
        Conversor de temperaturas
    </h1>

    <p class="mb-3 sm:mb-4">
        Digite um valor em qualquer unidade de temperatura e veja sua conversão para as demais unidades. As unidades disponíveis são: Celsius, Fahrenheit, Kelvin.
    </p>

    <div class="flex items-center gap-2 mb-4 sm:mb-5">
        <label for="celsius" class="w-36 text-sm md:text-base">Celsius</label>
        <div class="flex items-center gap-2 w-full">
            <input
                id="celsius"
                data-base="Celsius"
                class="w-full bg-white dark:bg-a-dark p-2 rounded-md shadow-sm border base-input"
                placeholder="0ºC"
            />
            <button
                class="bg-a-light dark:bg-a-dark text-white dark:text-black p-2 rounded-md shadow-sm border copy-button"
                data-clipboard-target="#celsius"
                aria-label="Copiar o valor do campo Celsius"
            >
                <i class="bi-clipboard"></i>
            </button>
        </div>
    </div>

    <div class="flex items-center gap-2 mb-4 sm:mb-5">
        <label for="fahrenheit" class="w-36 text-sm md:text-base">Fahrenheit</label>
        <div class="flex items-center gap-2 w-full">
            <input
                id="fahrenheit"
                data-base="Fahrenheit"
                class="w-full bg-white dark:bg-a-dark p-2 rounded-md shadow-sm border base-input"
                placeholder="0ºF"
            />
            <button
                class="bg-a-light dark:bg-a-dark text-white dark:text-black p-2 rounded-md shadow-sm border copy-button"
                data-clipboard-target="#fahrenheit"
                aria-label="Copiar o valor do campo Fahrenheit"
            >
                <i class="bi-clipboard"></i>
            </button>
        </div>
    </div>

    <div class="flex items-center gap-2 mb-4 sm:mb-5">
        <label for="kelvin" class="w-36 text-sm md:text-base">Kelvin</label>
        <div class="flex items-center gap-2 w-full">
            <input
                id="kelvin"
                data-base="Kelvin"
                class="w-full bg-white dark:bg-a-dark p-2 rounded-md shadow-sm border base-input"
                placeholder="0K"
            />
            <button
                class="bg-a-light dark:bg-a-dark text-white dark:text-black p-2 rounded-md shadow-sm border copy-button"
                data-clipboard-target="#kelvin"
                aria-label="Copiar o valor do campo Kelvin"
            >
                <i class="bi-clipboard"></i>
            </button>
        </div>
    </div>

    @include('includes.articles.temperatures')
@endsection

@vite('resources/ts/utils/temperatures.ts')
