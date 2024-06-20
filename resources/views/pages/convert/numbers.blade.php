@extends('layouts.app')

@section('title', 'Conversor de bases numéricas')

@section('meta')
    <meta name="title" content="Conversor de bases numéricas">
    <meta name="description" content="Conversor de bases numéricas. Digite um número em qualquer base numérica e veja sua conversão para as demais bases. As bases disponíveis são: binário, octal, decimal e hexadecimal.">
    <meta name="keywords" content="conversor de bases numéricas, conversor de bases, conversor de números, binário, octal, decimal, hexadecimal">
    <meta property="og:title" content="Conversor de bases numéricas">
    <meta property="og:description" content="Conversor de bases numéricas. Digite um número em qualquer base numérica e veja sua conversão para as demais bases. As bases disponíveis são: binário, octal, decimal e hexadecimal.">
    <meta property="og:url" content="{{ route('convert.numbers') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-3 sm:mb-4">
        Conversor de bases numéricas
    </h1>

    <p class="mb-3 sm:mb-4">
        Digite um número em qualquer base numérica e veja sua conversão para as demais bases.
    </p>

    <div class="flex items-center gap-2 mb-4 sm:mb-5">
        <label for="binary" class="w-36 text-sm md:text-base">Binário</label>
        <div class="flex items-center gap-2 w-full">
            <input
                id="binary"
                data-base="2"
                class="w-full bg-white dark:bg-a-dark p-2 rounded-md shadow-sm border base-input"
                placeholder="00000000"
            />
            <button
                class="bg-a-light dark:bg-a-dark text-white dark:text-black p-2 rounded-md shadow-sm border copy-button"
                data-clipboard-target="#binary"
                aria-label="Copiar o valor do campo Binário"
            >
                <img src="{{ asset('images/icons/clipboard.svg') }}" alt="">
            </button>
        </div>
    </div>

    <div class="flex items-center gap-2 mb-4 sm:mb-5">
        <label for="octal" class="w-36 text-sm md:text-base">Octal</label>
        <div class="flex items-center gap-2 w-full">
            <input
                id="octal"
                data-base="8"
                class="w-full bg-white dark:bg-a-dark p-2 rounded-md shadow-sm border base-input"
                placeholder="000"
            />
            <button
                class="bg-a-light dark:bg-a-dark text-white dark:text-black p-2 rounded-md shadow-sm border copy-button"
                data-clipboard-target="#octal"
                aria-label="Copiar o valor do campo Octal"
            >
                <img src="{{ asset('images/icons/clipboard.svg') }}" alt="">
            </button>
        </div>
    </div>

    <div class="flex items-center gap-2 mb-4 sm:mb-5">
        <label for="decimal" class="w-36 text-sm md:text-base">Decimal</label>
        <div class="flex items-center gap-2 w-full">
            <input
                id="decimal"
                data-base="10"
                class="w-full bg-white dark:bg-a-dark p-2 rounded-md shadow-sm border base-input"
                placeholder="0"
            />
            <button
                class="bg-a-light dark:bg-a-dark text-white dark:text-black p-2 rounded-md shadow-sm border copy-button"
                data-clipboard-target="#decimal"
                aria-label="Copiar o valor do campo Decimal"
            >
                <img src="{{ asset('images/icons/clipboard.svg') }}" alt="">
            </button>
        </div>
    </div>

    <div class="flex items-center gap-2 mb-4 sm:mb-5">
        <label for="hexadecimal" class="w-36 text-sm md:text-base">Hexadecimal</label>
        <div class="flex items-center gap-2 w-full">
            <input
                id="hexadecimal"
                data-base="16"
                class="w-full bg-white dark:bg-a-dark p-2 rounded-md shadow-sm border base-input"
                placeholder="00"
            />
            <button
                class="bg-a-light dark:bg-a-dark text-white dark:text-black p-2 rounded-md shadow-sm border copy-button"
                data-clipboard-target="#hexadecimal"
                aria-label="Copiar o valor do campo Hexadecimal"
            >
                <img src="{{ asset('images/icons/clipboard.svg') }}" alt="">
            </button>
        </div>
    </div>

    @include('includes.articles.numbers')

    @if (count($links) > 0)
        @component('components.links', ['links' => $links])
        @endcomponent
    @endif
@endsection

@vite('resources/ts/pages/convert.numbers.ts')
