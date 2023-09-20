@extends('layouts.app')

@section('title', 'Gerador de CPF')

@section('meta')
    <meta name="title" content="Gerador de CPF">
    <meta name="description" content="Gerador de CPFs válidos aleatórios. Você pode escolher se quer pontuação ou não e o estado.">
    <meta name="keywords" content="gerador de cpf, gerador de cpf online, gerador de cpf válido, gerador de cpf aleatório, gerador de cpf com pontuação, gerador de cpf com estado, gerador de cpf com uf, gerador de cpf com unidade federativa, gerador de muitos cpfs, gerador de cpf em massa, gerador de cpf em lote, gerador de multiplos cpfs">
    <meta property="og:title" content="Gerador de CPF">
    <meta property="og:description" content="Gerador de CPFs válidos aleatórios. Você pode escolher se quer pontuação ou não e o estado.">
    <meta property="og:url" content="{{ route('generate.cpf') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-2 sm:mb-3">
        Gerador de CPF
    </h1>

    <p class="mb-2 sm:mb-3">
        Gerador de CPFs válidos aleatórios. Você pode escolher se quer pontuação ou não e o estado.
        Basta clicar em gerar e copiar o CPF gerado.
    </p>

    <a
        href="{{ route('validate.cpf') }}"
        class="text-info hover:underline block mb-4 sm:mb-6"
        aria-label="Deseja validar em vez gerar?"
    >
        Deseja validar em vez gerar?
    </a>

    <div class="mb-2 sm:mb-3">
        <p class="mb-2 sm:mb-3">
            Pontuação?
        </p>
        <div class="flex gap-3">
            <div class="flex items-center">
                <input checked id="yes" type="radio" value="1" name="punctuation" class="w-4 h-4">
                <label for="yes" class="ml-2 text-sm font-medium">Sim</label>
            </div>
            <div class="flex items-center">
                <input id="no" type="radio" value="2" name="punctuation" class="w-4 h-4">
                <label for="no" class="ml-2 text-sm font-medium">Não</label>
            </div>
        </div>
    </div>

    <div class="mb-2 sm:mb-3">
        <p class="mb-2 sm:mb-3">
            Separador?
        </p>
        <div class="flex gap-3">
            <div class="flex items-center">
                <input checked id="word-break" type="radio" value="word-break" name="separator" class="w-4 h-4">
                <label for="word-break" class="ml-2 text-sm font-medium">Quebra de linha</label>
            </div>
            <div class="flex items-center">
                <input id="comma" type="radio" value="2" name="separator" class="w-4 h-4">
                <label for="comma" class="ml-2 text-sm font-medium">Vírgula</label>
            </div>
        </div>
    </div>

    <label for="uf" class="block mb-2 sm:mb-3">
        Estado
    </label>
    <select
        id="uf"
        class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-2 sm:mb-3 w-full sm:w-80"
    >
        <option value="">Qualquer</option>
        <option value="2">Acre</option>
        <option value="4">Alagoas</option>
        <option value="2">Amazonas</option>
        <option value="2">Amapá</option>
        <option value="5">Bahia</option>
        <option value="3">Ceará</option>
        <option value="1">Distrito Federal</option>
        <option value="7">Espirito Santo</option>
        <option value="1">Goiás</option>
        <option value="3">Maranhão</option>
        <option value="6">Minas Gerais</option>
        <option value="1">Mato Grosso do Sul</option>
        <option value="1">Mato Grosso</option>
        <option value="2">Pará</option>
        <option value="4">Paraíba</option>
        <option value="4">Pernambuco</option>
        <option value="3">Piauí</option>
        <option value="9">Paraná</option>
        <option value="7">Rio de Janeiro</option>
        <option value="4">Rio Grande do Norte</option>
        <option value="2">Rondônia</option>
        <option value="2">Roraima</option>
        <option value="0">Rio Grande do Sul</option>
        <option value="9">Santa Catarina</option>
        <option value="5">Sergipe</option>
        <option value="8">São Paulo</option>
        <option value="1">Tocantins</option>
    </select>

    <label for="quantity" class="block mb-2 sm:mb-3">
        Quantidade
    </label>
    <input
        id="quantity"
        type="number"
        value="1"
        min="1"
        max="100"
        class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-2 sm:mb-3 w-full sm:w-80"
    />

    <div class="grid grid-cols-2 gap-3 w-full sm:w-80 mb-4 sm:mb-6" id="buttons">
        <button
            id="generate"
            class="text-white rounded-md px-4 py-2 bg-p-light dark:bg-p-dark hover:bg-p-light-light dark:hover:bg-p-dark-light block text-center"
            aria-label="Gerar CPF"
        >
            Gerar
        </button>

        <button
            id="copy"
            class="text-t-light dark:text-white bg-transparent rounded-md h-10 px-4 border dark:t-light dark:border-white"
            aria-label="Copiar"
        >
            <span class="mr-1">Copiar</span>
            <i class="bi-clipboard"></i>
        </button>
    </div>

    <p>
        CPF(s) gerado
    </p>

    <div id="cpf" class="text-lg font-semibold mb-4 sm:mb-5">
        000.000.000-00
    </div>

    @include('includes.articles.cpf')

    @if (count($links) > 0)
        @component('components.links', ['links' => $links])
        @endcomponent
    @endif
@endsection

@vite('resources/ts/pages/generate.cpf.ts')
