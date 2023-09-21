<?php

namespace App\Console\Commands;

use App\Models\Name;
use Illuminate\Console\Command;

class AddNames extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:add-names';

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
        // ler o arquivo json names.json
        $names = json_decode(file_get_contents(database_path('data/names.json')));
        foreach ($names->males as $name) {
            $exists = Name::query()->where('name', $name)->exists();

            if ($exists) {
                continue;
            }

            Name::query()->create([
                'name' => $name,
                'prefix' => null,
                'genre' => 'male',
                'type' => 'first',
            ]);
        }

        foreach ($names->females as $name) {
            $exists = Name::query()->where('name', $name)->exists();

            if ($exists) {
                continue;
            }

            Name::query()->create([
                'name' => $name,
                'prefix' => null,
                'genre' => 'female',
                'type' => 'first',
            ]);
        }

        foreach ($names->surnames as $surname) {
            $prefix = null;

            if (count(explode(' ', $surname)) > 1) {
                $name = explode(' ', $surname)[1];
                $prefix = explode(' ', $surname)[0];
            } else {
                $name = $surname;
            }

            $existingRecord = Name::query()
                ->where('name', $name)
                ->first();

            if ($existingRecord) {
                if ($existingRecord->prefix === null && $prefix !== null) {
                    $existingRecord->update(['prefix' => $prefix]);
                }
            } else {
                Name::query()->create([
                    'name' => $name,
                    'prefix' => $prefix,
                    'genre' => 'both',
                    'type' => 'last',
                ]);
            }
        }
    }
}
