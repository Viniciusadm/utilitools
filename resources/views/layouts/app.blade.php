<!doctype html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite('resources/css/app.css')
    <title>
        @yield('title') - UtiliTools
    </title>

    @yield('meta')
</head>

<body class="bg-b-light dark:bg-b-dark text-t-light dark:text-t-dark">
<header class="bg-p-light dark:bg-p-dark text-b-light dark:text-b-dark">
    <div class="lg:w-4/5 xl:w-3/5 mx-auto grid grid-cols-1 md:grid-cols-2">
        <div class="flex items-center justify-center md:justify-start p-4">
            <a href="{{ route('home') }}" class="text-2xl font-bold text-white">
                UtiliTools
            </a>
        </div>

        <div class="flex items-center justify-center md:justify-end p-4">
            <label class="flex items-center h-10">
                <input name="search" class="rounded-s-md p-2 focus:outline-none focus:ring-2 focus:ring-p-light dark:focus:ring-p-dark focus:ring-offset-2 focus:ring-offset-b-light dark:focus:ring-offset-b-dark" placeholder="Pesquisar">
                <button class="rounded-e-md py-2 px-3 bg-s-light dark:bg-s-dark text-b-light dark:text-b-dark">
                    <i class="bi-search text-white"></i>
                </button>
            </label>
        </div>
    </div>
</header>

<div class="lg:w-4/5 xl:w-3/5 mx-auto">
    @yield('content')
</div>

@yield('scripts')
</body>

</html>
