<!doctype html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite('resources/css/app.css')
    @vite('resources/ts/app.ts')
    <title>
        @yield('title') - UtiliTools
    </title>

    @yield('meta')
    <meta name="google-site-verification" content="yhGpeq0-w7ZXyzcEMCfo_RkD___VPq_Kk96B5IQwqZs"/>
    <link rel="icon" href="{{ asset('images/favicon.png') }}" type="image/x-icon"/>
</head>

<body class="bg-b-light dark:bg-b-dark text-t-light dark:text-t-dark grid grid-rows-[auto,1fr,auto] min-h-screen">
@include('includes.header')

<div class="lg:w-4/5 mx-auto px-4 lg:px-0 mb-4">
    <div class="flex gap-4 min-h-main">
        @include('includes.aside')

        <main class="p-4 bg-a-light dark:bg-a-dark rounded-lg mt-4 sm:w-content">
            @yield('content')
        </main>
    </div>
</div>

@include('includes.footer')

@yield('scripts')
</body>

</html>
