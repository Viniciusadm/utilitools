<section id="links">
    <h4 class="text-white text-lg p-2 bg-info-light">Veja também:</h4>

    <ul class="list-none mb-2 sm:mb-3"
        aria-label="Links para outros conteúdos do site"
    >
        @foreach($links as $link)
            <li>
                <a
                    href="{{ $link->route }}"
                    class="text-info hover:underline block p-2 bg-white border-b border-info dark:bg-h-dark dark:border-a-dark dark:text-white"
                    aria-label="{{ $link->name }}"
                >
                    {{ $link->name }}
                </a>
            </li>
        @endforeach
    </ul>
</section>
