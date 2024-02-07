<?php

use App\Http\Controllers\SiteController;
use App\Http\Controllers\AuthController;
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

Route::name('auth.')->group(function () {
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login', [AuthController::class, 'logar'])->name('logar');
});

Route::prefix('gerar')->name('generate.')->group(function () {
    Route::get('/cpf', [SiteController::class, 'generateCpf'])->name('cpf');
    Route::get('/cnpj', [SiteController::class, 'generateCnpj'])->name('cnpj');
    Route::get('/numeros', [SiteController::class, 'generateNumbers'])->name('numbers');
    Route::get('/nomes', [SiteController::class, 'generateNames'])->name('names');
    Route::get('/lorem', [SiteController::class, 'generateLorem'])->name('lorem');
    Route::get('/rg', [SiteController::class, 'generateRg'])->name('rg');
    Route::get('/cnh', [SiteController::class, 'generateCnh'])->name('cnh');
});

Route::prefix('validar')->name('validate.')->group(function () {
    Route::get('/cpf', [SiteController::class, 'validateCpf'])->name('cpf');
    Route::get('/cnpj', [SiteController::class, 'validateCnpj'])->name('cnpj');
    Route::get('/rg', [SiteController::class, 'validateRg'])->name('rg');
    Route::get('/cnh', [SiteController::class, 'validateCnh'])->name('cnh');
});

Route::prefix('editar')->name('edit.')->group(function () {
    Route::get('/texto', [SiteController::class, 'editText'])->name('text');
    Route::get('/palavras', [SiteController::class, 'editWords'])->name('words');
});

Route::prefix('dividir')->name('split.')->group(function () {
    Route::get('/texto', [SiteController::class, 'splitText'])->name('text');
});

Route::prefix('converter')->name('convert.')->group(function () {
    Route::get('/numeros', [SiteController::class, 'convertNumbers'])->name('numbers');
    Route::get('/temperaturas', [SiteController::class, 'convertTemperatures'])->name('temperatures');
});

Route::prefix('cortar')->name('cut.')->group(function () {
    Route::get('/texto', [SiteController::class, 'cutText'])->name('text');
});

Route::prefix('remover')->name('remove.')->group(function () {
    Route::get('/acentos', [SiteController::class, 'removeAccents'])->name('accents');
});

Route::prefix('calcular')->name('calculate.')->group(function () {
    Route::get('/resto', [SiteController::class, 'calculateRest'])->name('rest');
    Route::get('/tres', [SiteController::class, 'calculateThree'])->name('three');
});

Route::prefix('contar')->name('count.')->group(function () {
    Route::get('/dias', [SiteController::class, 'countDays'])->name('days');
});

Route::prefix('numeros')->name('numbers.')->group(function () {
    Route::get('/por-extenso', [SiteController::class, 'numbersInFull'])->name('in-full');
});
