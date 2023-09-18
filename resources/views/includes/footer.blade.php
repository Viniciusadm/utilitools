<footer
    class="z-50 mi-w-screen bg-p-light dark:bg-p-dark text-b-light dark:text-b-dark px-2 lg:px-0 h-20"
>
    <div class="flex items-center ps-4 lg:w-4/5 mx-auto h-20">
        <a
            href="{{ route('site.home') }}"
            class="text-2xl font-bold text-white"
        >
            UtiliTools
        </a>
        <span class="text-white text-sm ms-2">by <a href="https://github.com/Viniciusadm" target="_blank" class="hover:underline">Viniciusadm</a></span>
        <span class="text-white text-sm ms-2">|</span>
        <span class="text-white text-sm ms-2">{{ date('Y') }}</span>
    </div>
</footer>
