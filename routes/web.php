<?php

use App\Http\Controllers\SiteController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [SiteController::class, 'home'])->name('home');

Route::prefix('gerar')->name('generate.')->group(function () {
    Route::get('/cpf', [SiteController::class, 'generateCpf'])->name('cpf');
});

Route::prefix('validar')->name('validate.')->group(function () {
    Route::get('/cpf', [SiteController::class, 'validateCpf'])->name('cpf');
});
