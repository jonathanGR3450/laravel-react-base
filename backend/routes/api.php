<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\Clasificacion\ConvencionalIndexController;
use App\Http\Controllers\Clasificacion\ConvencionalShowController;
use App\Http\Controllers\Clasificacion\ConvencionalStoreController;
use App\Http\Controllers\Clasificacion\NoConvencionalIndexController;
use App\Http\Controllers\Clasificacion\NoConvencionalShowController;
use App\Http\Controllers\Clasificacion\NoConvencionalStoreController;
use App\Http\Controllers\GetPredioController;
use App\Http\Controllers\Interesado\Show;
use App\Http\Controllers\Interesado\StoreColMiembros;
use App\Http\Controllers\Predio\GetPrediosByNumeroPredialController;
use App\Http\Controllers\Predio\IndexNumerosHomologadosController;
use App\Http\Controllers\Predio\IndexNumerosPredialesController;
use App\Http\Controllers\Predio\StoreLcPredio;
use App\Http\Controllers\Predio\StoreNumeroHomologadosController;
use App\Http\Controllers\Predio\StoreNumeroPredialController;
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
    Route::post('predio', StoreLcPredio::class);
    Route::post('predio/numeros-prediales', StoreNumeroPredialController::class);
    Route::get('predio/numeros-homologados', IndexNumerosHomologadosController::class);
    Route::post('predio/numeros-homologados', StoreNumeroHomologadosController::class);
    Route::get('predio/list/numeros-prediales/{numero_predial}/', GetPrediosByNumeroPredialController::class);
    Route::get('predio/list/local/numeros-prediales', IndexNumerosPredialesController::class);
    Route::get('predio/{id}', GetPredioController::class);

    Route::get('interesados/{nit}', Show::class);
    Route::post('interesados', StoreColMiembros::class);

    Route::get('caracteristicasunidadconstruccion/convencional', ConvencionalIndexController::class);
    Route::get('caracteristicasunidadconstruccion/convencional/{id}', ConvencionalShowController::class);
    Route::post('caracteristicasunidadconstruccion/convencional', ConvencionalStoreController::class);
    
    Route::get('caracteristicasunidadconstruccion/no-convencional', NoConvencionalIndexController::class);
    Route::get('caracteristicasunidadconstruccion/no-convencional/{id}', NoConvencionalShowController::class);
    Route::post('caracteristicasunidadconstruccion/no-convencional', NoConvencionalStoreController::class);
});
