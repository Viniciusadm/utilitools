<?php

namespace App\Http\Controllers;

use App\Helpers\JsonPattern;
use App\Models\Name;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GenerateController extends Controller
{
    public function name(Request $request): JsonResponse
    {
        $genre = $request->input('genre', 'male');

        $name = Name::query()
            ->where('genre', $genre)
            ->where('type', 'first')
            ->inRandomOrder()
            ->first();

        $middleName = Name::query()
            ->where('type', 'last')
            ->where('name', '!=', $name->name)
            ->inRandomOrder()
            ->first();

        $lastName = Name::query()
            ->where('type', 'last')
            ->where('name', '!=', $name->name)
            ->inRandomOrder()
            ->first();

        $first = $name->name;
        $middle = $middleName->name;
        $last = $lastName->prefix && rand(0, 1) ? $lastName->prefix . ' ' . $lastName->name : $lastName->name;

        return JsonPattern::data($first . ' ' . $middle . ' ' . $last);
    }
}
