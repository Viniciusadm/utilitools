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

    <meta name="google-site-verification" content="xOiiMIRDHjlhs2zgj1C7GSuxiI38euRzKBE1eX5b5KQ" />

    <link rel="icon" href="{{ asset('images/favicon.png') }}" type="image/x-icon"/>

    @if (config('services.google.analytics.id'))
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ config('services.google.analytics.id') }}"></script>
            <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '{{ config('services.google.analytics.id') }}');
        </script>
    @endif

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3503700693296604" crossorigin="anonymous"></script>
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
