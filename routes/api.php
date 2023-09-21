<?php

use App\Http\Controllers\GenerateController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::name('api.')->group(function () {
    Route::prefix('generate')->name('generator.')->group(function () {
        Route::get('/name', [GenerateController::class, 'name'])->name('name');
    });
});
