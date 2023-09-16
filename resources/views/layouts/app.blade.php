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
    <meta name="google-site-verification" content="yhGpeq0-w7ZXyzcEMCfo_RkD___VPq_Kk96B5IQwqZs" />
</head>

<body class="bg-b-light dark:bg-b-dark text-t-light dark:text-t-dark lg:w-4/5 mx-auto px-4 lg:px-0">
<nav class="z-50 w-full bg-p-light dark:bg-p-dark text-b-light dark:text-b-dark grid grid-cols-2 px-2 lg:px-0 h-20 mt-4 rounded-lg">
    <div class="flex items-center ps-4">
        <a
            href="{{ route('home') }}"
            class="text-2xl font-bold text-white"
        >
            UtiliTools
        </a>
    </div>

    <div class="flex items-center pe-4 sm:hidden justify-end">
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

    <div class="pe-4 hidden h-full sm:flex items-center justify-end">
        <label class="flex items-center justify-end">
            <input name="search" class="rounded-s-md p-2 h-10" placeholder="Pesquisar">
            <button class="h-10 rounded-e-md py-2 px-3 bg-s-light dark:bg-s-dark text-b-light dark:text-b-dark" aria-label="Pesquisar">
                <i class="bi-search text-white"></i>
            </button>
        </label>
    </div>
</nav>

<div class="flex gap-4">
    <aside
        id="sidebar"
        class="z-40 h-sidebar w-60 bg-a-light rounded-lg dark:bg-a-dark mt-4 hidden sm:block"
        aria-label="Sidebar"
    >
        <div class="h-full overflow-y-auto p-4 bg-a-light dark:bg-a-dark rounded-lg">
            <ul class="space-y-2 font-medium">
                @component('components.link-menu', ['name' => 'home', 'label' => 'Página inicial'])
                @endcomponent
                @component('components.link-menu', ['name' => 'generate.cpf', 'label' => 'Gerador de CPF'])
                @endcomponent
                @component('components.link-menu', ['name' => 'validate.cpf', 'label' => 'Validador de CPF'])
                @endcomponent
                @component('components.link-menu', ['name' => 'generate.cnpj', 'label' => 'Gerador de CNPJ'])
                @endcomponent
                @component('components.link-menu', ['name' => 'edit.text', 'label' => 'Editor de texto'])
                @endcomponent
            </ul>
        </div>
    </aside>

    @yield('content')
</div>

<script>
    const toggleSidebar = () => {
        const sidebar = document.querySelector('#sidebar');
        const openIcon = document.querySelector('#sidebar-open');

        if (isOpen) {
            openIcon.setAttribute('aria-hidden', 'true');
        } else {
            openIcon.setAttribute('aria-hidden', 'false');
        }
    }
</script>
@yield('scripts')
</body>

</html>
