<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\Clasificacion\ConvencionalIndexController;
use App\Http\Controllers\Clasificacion\ConvencionalShowController;
use App\Http\Controllers\Clasificacion\ConvencionalStoreController;
use App\Http\Controllers\Clasificacion\NoConvencionalIndexController;
use App\Http\Controllers\Clasificacion\NoConvencionalShowController;
use App\Http\Controllers\Clasificacion\NoConvencionalStoreController;
use App\Http\Controllers\Construccion\StoreDocuments;
use App\Http\Controllers\Derecho\StoreLocal AS StoreDerechoLocal;
use App\Http\Controllers\DatosPHCondominio\StoreLocal AS StoreDatosCondominioLocal;
use App\Http\Controllers\PredioCopropiedad\StoreLocal AS StorePredioCopropiedadLocal;
use App\Http\Controllers\RicPredio\StoreLocal AS StoreRicPredioLocal;
use App\Http\Controllers\RicTramiteCatastral\StoreLocal AS StoreRicTramiteCatastralLocal;
use App\Http\Controllers\FuenteAdministrativa\StoreLocal AS StoreFuenteAdministrativaLocal;
use App\Http\Controllers\Datosadicionaleslevantamientocatastral\StoreLocal AS StoreDatosadicionaleslevantamientocatastralLocal;
use App\Http\Controllers\ContactoVisita\StoreLocal AS StoreContactoVisitaLocal;
use App\Http\Controllers\Terreno\StoreLocal AS StoreTerrenoLocal;
use App\Http\Controllers\Construccion\StoreLocal AS StoreConstruccionLocal;
use App\Http\Controllers\Document\GenerateDocumentPdf;
use App\Http\Controllers\GetPredioController;
use App\Http\Controllers\Interesado\Show;
use App\Http\Controllers\Interesado\StoreColMiembros;
use App\Http\Controllers\Predio\GetPrediosByNumeroPredialController;
use App\Http\Controllers\Predio\IndexNumerosHomologadosController;
use App\Http\Controllers\Predio\IndexNumerosPredialesController;
use App\Http\Controllers\Predio\StoreFuenteAdministrativaDerechoController;
use App\Http\Controllers\Predio\StoreLcPredio;
use App\Http\Controllers\Predio\StoreNumeroHomologadosController;
use App\Http\Controllers\Predio\StoreNumeroPredialController;
use App\Http\Controllers\Predio\StoreNumeroPredialHomologadoController;
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
    Route::post('predio/numeros-prediales/numeros-homologados', StoreNumeroPredialHomologadoController::class);
    Route::post('predio/numeros-prediales', StoreNumeroPredialController::class);
    Route::get('predio/numeros-homologados', IndexNumerosHomologadosController::class);
    Route::post('predio/numeros-homologados', StoreNumeroHomologadosController::class);
    Route::get('predio/list/numeros-prediales/{numero_predial}/', GetPrediosByNumeroPredialController::class);
    Route::get('predio/list/local/numeros-prediales', IndexNumerosPredialesController::class);
    Route::get('predio/{id}', GetPredioController::class);

    Route::get('interesados/{nit}', Show::class);
    Route::post('interesados', StoreColMiembros::class);

    Route::post('derecho/local', StoreDerechoLocal::class);

    Route::post('datos-condominio/local', StoreDatosCondominioLocal::class);

    Route::post('predio-copropiedad/local', StorePredioCopropiedadLocal::class);

    Route::post('ric-predio/local', StoreRicPredioLocal::class);

    Route::post('ric-tramite-catastral/local', StoreRicTramiteCatastralLocal::class);

    Route::post('fuente-administrativa/local', StoreFuenteAdministrativaLocal::class);

    Route::post('terreno/local', StoreTerrenoLocal::class);

    Route::post('datos-adicionales/local', StoreDatosadicionaleslevantamientocatastralLocal::class);

    Route::post('contacto-visita/local', StoreContactoVisitaLocal::class);

    Route::post('construccion/local', StoreConstruccionLocal::class);
    Route::post('construccion/documentos', StoreDocuments::class);

    Route::post('rrrfuente/fuente-administrativa/derecho', StoreFuenteAdministrativaDerechoController::class);

    Route::get('caracteristicasunidadconstruccion/convencional', ConvencionalIndexController::class);
    Route::get('caracteristicasunidadconstruccion/convencional/{id}', ConvencionalShowController::class);
    Route::post('caracteristicasunidadconstruccion/convencional', ConvencionalStoreController::class);
    
    Route::get('caracteristicasunidadconstruccion/no-convencional', NoConvencionalIndexController::class);
    Route::get('caracteristicasunidadconstruccion/no-convencional/{id}', NoConvencionalShowController::class);
    Route::post('caracteristicasunidadconstruccion/no-convencional', NoConvencionalStoreController::class);

    Route::get('document/generate', GenerateDocumentPdf::class);
});
