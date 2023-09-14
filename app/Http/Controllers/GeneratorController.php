<?php

namespace App\Http\Controllers;

use App\Helpers\JsonPattern;
use App\services\GeneratorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GeneratorController extends Controller
{
    public function cpf(Request $request): JsonResponse
    {
        $punctuation = $request->input('punctuation', true);
        $uf = $request->input('uf');

        $cpf = GeneratorService::cpf($punctuation, $uf);
        return JsonPattern::data($cpf);
    }
}
