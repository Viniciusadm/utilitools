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
        <a
            href="{{ route('generate.cpf') }}"
            class="bg-p-light dark:bg-p-dark rounded-lg p-4 text-white hover:bg-p-light-light dark:hover:bg-p-dark-light"
            aria-label="Gerador de CPF"
        >
            <h2 class="text-xl font-semibold mb-2">
                Gerador de CPF
            </h2>
            <p class="mb-2">
                Gere um ou mais CPFs válidos.
            </p>
            <p class="text-sm">
                Gerar
            </p>
        </a>

        <a
            href="{{ route('validate.cpf') }}"
            class="bg-p-light dark:bg-p-dark rounded-lg p-4 text-white hover:bg-p-light-light dark:hover:bg-p-dark-light"
            aria-label="Validador de CPF"
        >
            <h2 class="text-xl font-semibold mb-2">
                Validador de CPF
            </h2>
            <p class="mb-2">
                Valide um ou mais CPFs.
            </p>
            <p class="text-sm">
                Validar
            </p>
        </a>

        <a
            href="{{ route('edit.text') }}"
            class="bg-p-light dark:bg-p-dark rounded-lg p-4 text-white hover:bg-p-light-light dark:hover:bg-p-dark-light"
            aria-label="Editor de texto"
        >
            <h2 class="text-xl font-semibold mb-2">
                Editor de texto
            </h2>
            <p class="mb-2">
                Edite seu texto como quiser.
            </p>
            <p class="text-sm">
                Editar
            </p>
        </a>

        <a
            href="{{ route('generate.cnpj') }}"
            class="bg-p-light dark:bg-p-dark rounded-lg p-4 text-white hover:bg-p-light-light dark:hover:bg-p-dark-light"
            aria-label="Gerador de CNPJ"
        >
            <h2 class="text-xl font-semibold mb-2">
                Gerador de CNPJ
            </h2>
            <p class="mb-2">
                Gere um ou mais CNPJs válidos.
            </p>
            <p class="text-sm">
                Gerar
            </p>
        </a>

        <a
            href="{{ route('validate.cnpj') }}"
            class="bg-p-light dark:bg-p-dark rounded-lg p-4 text-white hover:bg-p-light-light dark:hover:bg-p-dark-light"
            aria-label="Validador de CNPJ"
        >
            <h2 class="text-xl font-semibold mb-2">
                Validador de CNPJ
            </h2>
            <p class="mb-2">
                Valide um ou mais CNPJs.
            </p>
            <p class="text-sm">
                Validar
            </p>
        </a>

        <a
            href="{{ route('convert.numbers') }}"
            class="bg-p-light dark:bg-p-dark rounded-lg p-4 text-white hover:bg-p-light-light dark:hover:bg-p-dark-light"
            aria-label="Conversor de números"
        >
            <h2 class="text-xl font-semibold mb-2">
                Conversor de números
            </h2>
            <p class="mb-2">
                Converta números para binário, octal, hexadecimal e romano.
            </p>
            <p class="text-sm">
                Converter
            </p>
        </a>
    </div>
@endsection
