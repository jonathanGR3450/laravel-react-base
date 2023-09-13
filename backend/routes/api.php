<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ClasificacionStoreController;
use App\Http\Controllers\GetPredioController;
use Illuminate\Http\Request;
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

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::prefix('v1')->group(function () {
    Route::get('predio/{id}', GetPredioController::class);
    Route::post('caracteristicasunidadconstruccion', ClasificacionStoreController::class);
});
