<?php

namespace App\Console\Commands;

use App\Models\Tool;
use Illuminate\Console\Command;

class AddTool extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:add-tool';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Adiciona uma nova ferramenta';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $name = $this->ask('Nome');
        $route = $this->ask('Rota');

        Tool::query()->create([
            'name' => $name,
            'type' => explode('.', $route)[0],
            'category' => explode('.', $route)[1],
        ]);

        $this->info('Ferramenta adicionada com sucesso!');
    }
}
