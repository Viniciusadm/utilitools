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
    Route::get('/cnpj', [SiteController::class, 'generateCnpj'])->name('cnpj');
});

Route::prefix('validar')->name('validate.')->group(function () {
    Route::get('/cpf', [SiteController::class, 'validateCpf'])->name('cpf');
    Route::get('/cnpj', [SiteController::class, 'validateCnpj'])->name('cnpj');
});

Route::prefix('editar')->name('edit.')->group(function () {
    Route::get('/texto', [SiteController::class, 'editText'])->name('text');
});
