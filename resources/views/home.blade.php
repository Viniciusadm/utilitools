@extends('layouts.app')

@section('title', 'Ferramentas úteis online')

@section('meta')
    <meta name="title" content="Ferramentas úteis online">
    <meta name="description" content="Ferramentas úteis online para testes, desenvolvimento e estudos. Geradores de CPF, CNPJ, números, editores de texto entre outras para agilizar a vida de programadores.">
    <meta name="keywords" content="ferramentas úteis, ferramentas úteis online, ferramentas online, ferramentas, gerador de cpf, gerador de cpf online, gerador de cpf válido, gerador de cpf aleatório, gerador de cpf com pontuação, gerador de cpf com estado, gerador de cpf com uf, gerador de cpf com unidade federativa, gerador de muitos cpfs, gerador de cpf em massa, gerador de cpf em lote, gerador de multiplos cpfs, validar cpf, validar cpf online, editor de texto, inverter texto, maiúsculas, minúsculas, capitalizar, alternar caixa, embaralhar, remover duplicados">
    <meta property="og:title" content="Ferramentas úteis online">
    <meta property="og:description" content="Ferramentas úteis online para testes, desenvolvimento e estudos. Geradores de CPF, CNPJ, números, editores de texto entre outras para agilizar a vida de programadores.">
    <meta property="og:url" content="{{ route('home') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
        Principais ferramentas
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @foreach($main as $m)
            <a
                href="{{ route($m->type . '.' . $m->category) }}"
                class="bg-p-light dark:bg-p-dark rounded-lg p-4 text-white hover:bg-p-light-light dark:hover:bg-p-dark-light"
                aria-label="{{ $m->name }}"
            >
                <h2 class="text-lg font-semibold mb-2">
                    {{ $m->name }}
                </h2>

                <p class="mb-2">
                    {{ $m->description }}
                </p>
            </a>
        @endforeach
    </div>
@endsection
