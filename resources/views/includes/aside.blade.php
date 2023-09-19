<aside
    id="sidebar"
    class="z-40 w-sidebar sm:w-60 bg-a-light rounded-lg dark:bg-a-dark mt-4 mx-4 sm:mx-0 hidden sm:block absolute sm:static left-0"
    aria-label="Sidebar"
>
    <div class="h-full overflow-y-auto p-4 bg-a-light dark:bg-a-dark rounded-lg">
        <ul class="space-y-2 font-medium">
            @component('components.link-menu', ['name' => 'home', 'label' => 'Página inicial'])
            @endcomponent

            @foreach($tools as $tool)
                @component('components.link-menu', ['name' => $tool->type . '.' . $tool->category, 'label' => $tool->name])
                @endcomponent
            @endforeach
        </ul>
    </div>
</aside>
