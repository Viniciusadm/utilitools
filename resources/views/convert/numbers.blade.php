@extends('layouts.app')

@section('title', 'Conversor de bases numéricas')

@section('content')
    <main class="p-4 bg-a-light dark:bg-a-dark rounded-lg mt-4 w-screen sm:w-content">
        <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
            Conversor de bases numéricas
        </h1>

        <p class="mb-2 sm:mb-3">
            Digite um número em qualquer base numérica e veja sua conversão para as demais bases.
        </p>

        <label for="binary" class="flex items-center gap-2 mb-3 sm:mb-4">
            <span class="w-44">Binário</span>
            <input
                id="binary"
                data-base="2"
                class="w-full bg-white dark:bg-a-dark p-2 rounded-md shadow-sm border base-input"
                placeholder="00000000"
            >
        </label>

        <label for="octal" class="flex items-center gap-2 mb-3 sm:mb-4">
            <span class="w-44">Octal</span>
            <input
                id="octal"
                data-base="8"
                class="w-full bg-white dark:bg-a-dark p-2 rounded-md shadow-sm border base-input"
                placeholder="000"
            >
        </label>

        <label for="decimal" class="flex items-center gap-2 mb-3 sm:mb-4">
            <span class="w-44">Decimal</span>
            <input
                id="decimal"
                data-base="10"
                class="w-full bg-white dark:bg-a-dark p-2 rounded-md shadow-sm border base-input"
                placeholder="0"
            >
        </label>

        <label for="hexadecimal" class="flex items-center gap-2 mb-3 sm:mb-4">
            <span class="w-44">Hexadecimal</span>
            <input
                id="hexadecimal"
                data-base="16"
                class="w-full bg-white dark:bg-a-dark p-2 rounded-md shadow-sm border base-input"
                placeholder="00"
            >
        </label>
    </main>
@endsection

@vite('resources/ts/utils/numbers.ts')
