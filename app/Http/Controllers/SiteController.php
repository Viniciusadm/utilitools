<?php

namespace App\Http\Controllers;

use App\Helpers\LinksHelper;
use Illuminate\Contracts\View\View;

class SiteController extends Controller
{
    public function home(): View
    {
        return view('home');
    }

    public function generateCpf(): View
    {
        return view('pages.generate.cpf', ['links' => LinksHelper::get()]);
    }

    public function generateCnpj(): View
    {
        return view('pages.generate.cnpj', ['links' => LinksHelper::get()]);
    }

    public function generateNumbers(): View
    {
        return view('pages.generate.numbers', ['links' => LinksHelper::get()]);
    }

    public function generateNames(): View
    {
        return view('pages.generate.names', ['links' => LinksHelper::get()]);
    }

    public function validateCpf(): View
    {
        return view('pages.validate.cpf', ['links' => LinksHelper::get()]);
    }

    public function validateCnpj(): View
    {
        return view('pages.validate.cnpj', ['links' => LinksHelper::get()]);
    }

    public function editText(): View
    {
        return view('pages.edit.text', ['links' => LinksHelper::get()]);
    }

    public function editWords(): View
    {
        return view('pages.edit.words', ['links' => LinksHelper::get()]);
    }

    public function splitText(): View
    {
        return view('pages.split.text', ['links' => LinksHelper::get()]);
    }

    public function convertNumbers(): View
    {
        return view('pages.convert.numbers', ['links' => LinksHelper::get()]);
    }

    public function convertTemperatures(): View
    {
        return view('pages.convert.temperatures', ['links' => LinksHelper::get()]);
    }
}
