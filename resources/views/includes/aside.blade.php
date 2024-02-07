<aside
    id="sidebar"
    class="z-[51] w-sidebar sm:w-60 bg-a-light rounded-lg dark:bg-a-dark mt-4 mx-4 sm:mx-0 hidden sm:block absolute sm:static left-0"
    aria-label="Sidebar"
>
    <div class="h-full overflow-y-auto p-4 bg-a-light dark:bg-a-dark rounded-lg">
        <ul class="space-y-2 font-medium">
            @component('components.link-menu', ['name' => 'home', 'label' => 'Página inicial'])
            @endcomponent

            @if ($tools->where('function', 'service')->count() > 0)
                <li class="flex items-center p-2 ml-2 text-t-white dark:text-t-dark border-b-2">
                    Serviços
                </li>
            @endif

            @foreach($tools->where('function', 'service') as $tool)
                @component('components.link-menu', ['name' => $tool->type . '.' . $tool->category, 'label' => $tool->name])
                @endcomponent
            @endforeach

            @if ($tools->where('function', 'tool')->count() > 0)
                <li class="flex items-center p-2 ml-2 text-t-white dark:text-t-dark border-b-2">
                    Ferramentas
                </li>
            @endif

            @foreach($tools->where('function', 'tool') as $tool)
                @component('components.link-menu', ['name' => $tool->type . '.' . $tool->category, 'label' => $tool->name])
                @endcomponent
            @endforeach
        </ul>
    </div>
</aside>
