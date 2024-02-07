<nav class="z-50 w-full bg-p-light dark:bg-p-dark text-b-light dark:text-b-dark h-20">
    <div class="lg:w-4/5 mx-auto grid grid-cols-2 px-2 lg:px-0 h-20">
        <div class="flex items-center ps-4">
            <a
                href="{{ route('home') }}"
                class="text-2xl font-bold text-white"
            >
                UtiliTools
            </a>
        </div>

        <div class="hidden sm:flex items-center justify-end pe-4">
            @if (!Auth::check())
                <a
                    href="{{ route('auth.login') }}"
                    class="text-white hover:text-p-light dark:hover:text-white"
                >
                    Login
                </a>
                <a
                    href="{{ route('auth.register') }}"
                    class="text-white hover:text-p-light dark:hover:text-white ms-4"
                >
                    Registrar
                </a>
            @else
                <p class="text-white">
                    Olá, {{ Auth::user()->first_name }}
                </p>
            @endif
        </div>

        <div class="flex items-center pe-4 sm:hidden justify-end">
            <button
                data-drawer-target="sidebar"
                data-drawer-toggle="sidebar"
                aria-controls="sidebar"
                id="sidebar-toggle"
                class="inline-flex items-center text-sm rounded-lg sm:hidden hover:bg-h-light p-2"
            >
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" id="sidebar-open">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
        </div>
    </div>
</nav>
