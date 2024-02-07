@extends('layouts.app')

@section('title', 'Registro')

@section('meta')
    <meta name="title" content="Registro">
    <meta name="description" content="Registre sua conta para acessar nossos serviços.">
    <meta name="keywords" content="registro, autenticação, acesso, conta, usuário, senha">
    <meta property="og:title" content="Registro">
    <meta property="og:description" content="Registre sua conta para acessar nossos serviços.">
    <meta property="og:url" content="{{ route('auth.register') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-3 sm:mb-4">
        Registro
    </h1>

    <p class="mb-3 sm:mb-4">
        Registre sua conta para acessar nossos serviços.
    </p>

    <form action="{{ route('auth.register') }}" method="post" class="flex flex-col gap-4">
        @csrf

        <div>
            <label for="name" class="block mb-2 sm:mb-3">
                Nome
            </label>
            <input
                id="name"
                name="name"
                class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-2 sm:mb-3 w-full"
            />
            @if ($errors->has('name'))
                <p class="text-danger text-sm sm:text-base">
                    {{ $errors->first('name') }}
                </p>
            @endif
        </div>

        <div>
            <label for="email" class="block mb-2 sm:mb-3">
                E-mail
            </label>
            <input
                id="email"
                type="email"
                name="email"
                class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-2 sm:mb-3 w-full"
            />
            @if ($errors->has('email'))
                <p class="text-danger text-sm sm:text-base">
                    {{ $errors->first('email') }}
                </p>
            @endif
        </div>

        <div>
            <label for="password" class="block mb-2 sm:mb-3">
                Senha
            </label>
            <input
                id="password"
                type="password"
                name="password"
                class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark w-full"
            />
            @if ($errors->has('password'))
                <p class="text-danger text-sm sm:text-base">
                    {{ $errors->first('password') }}
                </p>
            @endif
        </div>

        @if (session('error'))
            <p class="text-danger text-sm sm:text-base">
                {{ session('error') }}
            </p>
        @endif

        <button
            type="submit"
            class="w-full sm:w-40 text-white rounded-md px-4 py-2 bg-p-light dark:bg-p-dark hover:bg-p-light-light dark:hover:bg-p-dark-light block text-center"
            aria-label="Registrar"
        >
            Registrar
        </button>
    </form>
@endsection
