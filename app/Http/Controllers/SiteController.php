<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;

class SiteController extends Controller
{
    public function home(): View
    {
        return view('home');
    }

    public function generateCpf(): View
    {
        return view('generate.cpf');
    }

    public function validateCpf(): View
    {
        $cpf = request()->query('cpf');
        return view('validate.cpf', ['cpf' => $cpf]);
    }
}
