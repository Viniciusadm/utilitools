<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Route;

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

        $routes = Route::getRoutes()->getRoutesByName();

        foreach (array_keys($routes) as $route) {
            if (str_contains($route, 'site.')) {
                $xml .= $this->addRoute($route);
            }
        }

        $xml .= $end;

        $file = fopen(public_path('sitemap.xml'), 'w');

        fwrite($file, $xml);
    }

    private function addRoute(string $route): string
    {
        $route = str_replace('http://', 'https://', route($route));

        $xml = '<url>' . PHP_EOL;
        $xml .= '<loc>' . $route . '</loc>' . PHP_EOL;
        $xml .= '</url>' . PHP_EOL;

        return $xml;
    }
}
