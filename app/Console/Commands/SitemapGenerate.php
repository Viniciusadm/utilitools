<?php

namespace App\Console\Commands;

use App\Models\Tool;
use Illuminate\Console\Command;

class SitemapGenerate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sitemap-generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Gerar sitemap.xml';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $init = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
        $init .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;

        $end = '</urlset>' . PHP_EOL;

        $xml = $init;

        $xml .= $this->addRoute(route('home'));

        foreach (Tool::query()->orderBy('type')->get() as $route) {
            $xml .= $this->addRoute($route->route);
        }

        $xml .= $end;

        $file = fopen(public_path('sitemap.xml'), 'w');

        fwrite($file, $xml);
    }

    private function addRoute(string $route): string
    {
        $route = str_replace('http://', 'https://', $route);

        $xml = '<url>' . PHP_EOL;
        $xml .= '<loc>' . $route . '</loc>' . PHP_EOL;
        $xml .= '</url>' . PHP_EOL;

        return $xml;
    }
}
