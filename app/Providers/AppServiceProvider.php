<?php

namespace App\Providers;

use App\Models\Tool;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $tools = Tool::query()
            ->orderBy('type')
            ->get();

        View::share([
            'tools' => $tools,
        ]);
    }
}
