<aside
    id="sidebar"
    class="z-40 w-sidebar sm:w-60 bg-a-light rounded-lg dark:bg-a-dark mt-4 mx-4 sm:mx-0 hidden sm:block absolute sm:static left-0"
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
            @component('components.link-menu', ['name' => 'validate.cnpj', 'label' => 'Validador de CNPJ'])
            @endcomponent
            @component('components.link-menu', ['name' => 'edit.text', 'label' => 'Editor de texto'])
            @endcomponent
            @component('components.link-menu', ['name' => 'generate.numbers', 'label' => 'Gerador de números'])
            @endcomponent
            @component('components.link-menu', ['name' => 'convert.numbers', 'label' => 'Conversor de números'])
            @endcomponent
            @component('components.link-menu', ['name' => 'convert.temperatures', 'label' => 'Conversor de temperaturas'])
            @endcomponent
        </ul>
    </div>
</aside>
