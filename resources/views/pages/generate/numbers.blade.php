@extends('layouts.app')

@section('title', 'Conversor de bases numéricas')

@section('content')
    <h1 class="text-2xl font-semibold mb-3 sm:mb-4">
        Gerador de números aleatórios
    </h1>
@endsection

@vite('resources/ts/utils/numbers.ts')
