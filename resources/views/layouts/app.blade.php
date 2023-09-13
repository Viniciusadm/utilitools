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
@yield('content')

@yield('scripts')
</body>

</html>
