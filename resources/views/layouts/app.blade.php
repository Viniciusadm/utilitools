<!doctype html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite('resources/css/app.css')
    @vite('resources/js/app.js')
    <title>
        @yield('title') - UtiliTools
    </title>

    @yield('meta')
</head>

<body class="bg-b-light dark:bg-b-dark text-t-light dark:text-t-dark">
<nav class="fixed top-0 z-50 w-full bg-p-light dark:bg-p-dark text-b-light dark:text-b-dark grid grid-cols-2 px-2 lg:px-0 h-20">
    <div class="flex items-center px-2 sm:hidden">
        <button
            data-drawer-target="sidebar"
            data-drawer-toggle="sidebar"
            aria-controls="sidebar"
            class="inline-flex items-center text-sm rounded-lg sm:hidden hover:bg-h-light p-2"
            onclick="toggleSidebar()"
        >
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" id="sidebar-open">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
        </button>
    </div>

    <div class="flex items-center justify-center md:justify-start py-4 px-16">
        <a href="{{ route('home') }}" class="text-2xl font-bold text-white">
            UtiliTools
        </a>
    </div>

    <div class="py-4 px-16 hidden sm:block">
        <label class="flex items-center justify-end h-10">
            <input name="search" class="rounded-s-md p-2" placeholder="Pesquisar">
            <button class="rounded-e-md py-2 px-3 bg-s-light dark:bg-s-dark text-b-light dark:text-b-dark">
                <i class="bi-search text-white"></i>
            </button>
        </label>
    </div>
</nav>

<aside id="sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-a-light border-r border-h-light sm:translate-x-0 dark:bg-a-dark dark:border-h-dark" aria-label="Sidebar">
    <div class="h-full p-4 overflow-y-auto bg-a-light dark:bg-a-dark">
        <ul class="space-y-2 font-medium">
            @component('components.link-menu', ['name' => 'home', 'label' => 'Página inicial'])
            @endcomponent
            @component('components.link-menu', ['name' => 'generate.cpf', 'label' => 'Gerador de CPF'])
            @endcomponent
            @component('components.link-menu', ['name' => 'validate.cpf', 'label' => 'Validador de CPF'])
            @endcomponent
        </ul>
    </div>
</aside>

<div class="ps-4 sm:ml-64 mt-20">
    @yield('content')
</div>

<script>
    const toggleSidebar = () => {
        const sidebar = document.querySelector('#sidebar');
        const openIcon = document.querySelector('#sidebar-open');
        const isOpen = sidebar.classList.contains('sm:translate-x-0');

        if (isOpen) {
            sidebar.classList.remove('sm:translate-x-0');
            sidebar.classList.add('-translate-x-full');
            openIcon.setAttribute('aria-hidden', 'true');
        } else {
            sidebar.classList.remove('-translate-x-full');
            sidebar.classList.add('sm:translate-x-0');
            openIcon.setAttribute('aria-hidden', 'false');
        }
    }
</script>
@yield('scripts')
</body>

</html>
