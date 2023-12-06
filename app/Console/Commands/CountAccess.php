<?php

namespace App\Console\Commands;

use App\Models\Access;
use App\Models\Tool;
use Illuminate\Console\Command;

class CountAccess extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:count-access';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        Tool::query()->update(['views' => 0]);

        $access = Access::query()->select('url')->where('url', '!=', '/')->pluck('url');
        foreach ($access->toArray() as $url) {
            Tool::query()->where([
                'category' => explode('/', $url)[0],
                'type' => explode('/', $url)[1],
            ])->first()->increment('views');
        }
    }
}
