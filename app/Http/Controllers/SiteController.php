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

    public function generateCnpj(): View
    {
        return view('generate.cnpj');
    }

    public function validateCpf(): View
    {
        $cpf = request()->query('cpf');
        return view('validate.cpf', ['cpf' => $cpf]);
    }

    public function validateCnpj(): View
    {
        $cnpj = request()->query('cnpj');
        return view('validate.cnpj', ['cnpj' => $cnpj]);
    }

    public function editText(): View
    {
        return view('edit.text');
    }

    public function convertNumbers(): View
    {
        return view('convert.numbers');
    }
}
