<li>
    <a
        href="{{ route('' . $name) }}"
        class="flex items-center p-2 text-t-white rounded-lg dark:text-t-dark hover:bg-h-light hover:text-white dark:hover:bg-h-dark {{ Route::currentRouteName() === $name ? 'bg-h-light dark:bg-h-dark text-white' : '' }}"
        aria-label="{{ $label }}"
        aria-current="{{ Route::currentRouteName() === $name ? 'true' : 'false' }}"
    >
        <span class="ml-2">
            {{ $label }}
        </span>
    </a>
</li>
