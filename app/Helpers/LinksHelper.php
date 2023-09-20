<?php

namespace App\Helpers;

use App\Models\Tool;
use Illuminate\Database\Eloquent\Collection;

class LinksHelper
{
    public static function get(): Collection
    {
        $name = request()->route()->getName();
        $type = explode('.', $name)[0];
        $category = explode('.', $name)[1];

        $actual = Tool::query()
            ->where('type', $type)
            ->where('category', $category)
            ->first();

        return Tool::query()
            ->where(function ($query) use ($type, $category) {
                $query->where('type', $type)
                    ->orWhere('category', $category);
            })
            ->where('id', '!=', $actual->id)
            ->orderBy('views', 'desc')
            ->limit(6)
            ->get();
    }
}
