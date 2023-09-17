@extends('layouts.app')

@section('title', 'Conversor de bases numéricas')

@section('content')
    <main class="p-4 bg-a-light dark:bg-a-dark rounded-lg mt-4 w-screen sm:w-content">
        <h1 class="text-2xl font-semibold mb-3 sm:mb-4">
            Gerador de números aleatórios
        </h1>
    </main>
@endsection

@vite('resources/ts/utils/numbers.ts')
