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
        return view('pages.generate.cpf');
    }

    public function generateCnpj(): View
    {
        return view('pages.generate.cnpj');
    }

    public function generateNumbers(): View
    {
        return view('pages.generate.numbers');
    }

    public function validateCpf(): View
    {
        $cpf = request()->query('cpf');
        return view('pages.validate.cpf', ['cpf' => $cpf]);
    }

    public function validateCnpj(): View
    {
        $cnpj = request()->query('cnpj');
        return view('pages.validate.cnpj', ['cnpj' => $cnpj]);
    }

    public function editText(): View
    {
        return view('pages.edit.text');
    }

    public function convertNumbers(): View
    {
        return view('pages.convert.numbers');
    }
}
