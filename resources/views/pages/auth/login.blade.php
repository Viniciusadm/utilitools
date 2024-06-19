@extends('layouts.app')

@section('title', 'Login')

@section('meta')
    <meta name="title" content="Login">
    <meta name="description" content="Faça login para acessar nossos serviços.">
    <meta name="keywords" content="login, autenticação, acesso, conta, usuário, senha">
    <meta property="og:title" content="Login">
    <meta property="og:description" content="Faça login para acessar nossos serviços.">
    <meta property="og:url" content="{{ route('auth.login') }}">
@endsection

@section('content')
    <h1 class="text-2xl font-semibold mb-3 sm:mb-4">
        Login
    </h1>

    <p class="mb-3 sm:mb-4">
        Faça login para acessar nossos serviços.
    </p>

    <form action="{{ route('auth.logar') }}" method="post" class="flex flex-col gap-4">
        @csrf

        <div>
            <label for="email" class="block mb-2 sm:mb-3">
                E-mail
            </label>
            <input
                id="email"
                type="email"
                name="email"
                class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark mb-2 sm:mb-3 w-full"
                required
            />
            @if ($errors->has('email'))
                <p class="text-danger text-sm sm:text-base">
                    {{ $errors->first('email') }}
                </p>
            @endif
        </div>

        <p class="text-success hidden" id="success"></p>

        <div>
            <label for="password" class="block mb-2 sm:mb-3">
                Senha
            </label>
            <input
                id="password"
                type="password"
                name="password"
                class="border rounded-lg block p-2 sm:p-2.5 bg-white dark:bg-a-dark w-full"
                required
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
            aria-label="Entrar"
        >
            Entrar
        </button>
    </form>
@endsection
