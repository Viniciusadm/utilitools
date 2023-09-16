<li>
    <a
        href="{{ route($name) }}"
        class="flex items-center p-2 text-t-light rounded-lg dark:text-t-dark hover:bg-h-light dark:hover:bg-h-dark {{ Route::currentRouteName() === $name ? 'bg-h-light dark:bg-h-dark' : '' }}"
        aria-label="{{ $label }}"
        aria-selected="{{ Route::currentRouteName() === $name ? 'true' : 'false' }}"
    >
        <span class="ml-2">
            {{ $label }}
        </span>
    </a>
</li>
