<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(): View
    {
        return view('pages.auth.login');
    }

    public function logar(Request $request): RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8'
        ], [
            'email.required' => 'O campo e-mail é obrigatório',
            'email.email' => 'O campo e-mail deve ser um e-mail válido',
            'password.required' => 'O campo senha é obrigatório',
            'password.min' => 'O campo senha deve ter no mínimo 8 caracteres'
        ]);

        if ($validator->fails()) {
            return redirect()->route('auth.login')->withErrors($validator)->withInput();
        }

        $attempt = Auth::attempt($request->only('email', 'password'));

        if (!$attempt) {
            return redirect()->route('auth.login')->with('error', 'E-mail ou senha inválidos');
        }

        return redirect()->route('home');
    }

    public function register(): View
    {
        return view('pages.auth.register');
    }

    public function create(Request $request): RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8'
        ], [
            'name.required' => 'O campo nome é obrigatório',
            'name.min' => 'O campo nome deve ter no mínimo 3 caracteres',
            'email.required' => 'O campo e-mail é obrigatório',
            'email.email' => 'O campo e-mail deve ser um e-mail válido',
            'email.unique' => 'Este e-mail já está em uso',
            'password.required' => 'O campo senha é obrigatório',
            'password.min' => 'O campo senha deve ter no mínimo 8 caracteres',
        ]);

        if ($validator->fails()) {
            return redirect()->route('auth.register')->withErrors($validator)->withInput();
        }

        /** @var User $user */
        $user = User::query()->create([
            'name' => $request->string('name'),
            'email' => $request->string('email'),
            'password' => bcrypt($request->string('password'))
        ]);

        Auth::login($user);

        return redirect()->route('home');
    }
}
