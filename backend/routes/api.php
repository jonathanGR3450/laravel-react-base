<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\AvaluoPredial\CalcularIncrementoAvaluoController;
use App\Http\Controllers\AvaluoPredial\ListTabAnexosUrbanaRuralLocalController;
use App\Http\Controllers\AvaluoPredial\ListTabBod60UrbanaRuralLocalController;
use App\Http\Controllers\AvaluoPredial\ListTabCcF0360UrbanaRuralLocalController;
use App\Http\Controllers\AvaluoPredial\ListTabCom60UrbanaRuralLocalController;
use App\Http\Controllers\AvaluoPredial\ListTabHot60UrbanaRuralLocalController;
use App\Http\Controllers\AvaluoPredial\ListTabSantaMariaDeLosAngelesUrbanaLocalController;
use App\Http\Controllers\AvaluoPredial\ListTabViv60UrbanaRuralController;
use App\Http\Controllers\AvaluoPredial\ListValorTerrenoRuralController;
use App\Http\Controllers\AvaluoPredial\ListValorTerrenoUrbanoController;
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
use App\Http\Controllers\UnidadConstruccion\StoreLocal AS StoreUnidadConstruccionLocal;
use App\Http\Controllers\Document\GenerateDocumentPdf;
use App\Http\Controllers\GetPredioController;
use App\Http\Controllers\Interesado\Show;
use App\Http\Controllers\Interesado\StoreColMiembros;
use App\Http\Controllers\Predio\GetPredioNumeroPredialController;
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

// ->middleware(['auth:api'])
Route::prefix('v1')->group(function () {

    Route::prefix('predio')->group(function () {
        Route::post('', StoreLcPredio::class);
        Route::get('numero-predial', GetPredioNumeroPredialController::class);
        Route::post('numeros-prediales/numeros-homologados', StoreNumeroPredialHomologadoController::class);
        Route::post('numeros-prediales', StoreNumeroPredialController::class);
        Route::get('numeros-homologados', IndexNumerosHomologadosController::class);
        Route::post('numeros-homologados', StoreNumeroHomologadosController::class);
        Route::get('list/numeros-prediales/{numero_predial}/', GetPrediosByNumeroPredialController::class);
        Route::get('list/local/numeros-prediales', IndexNumerosPredialesController::class);
        Route::get('{id}', GetPredioController::class);
    });

    Route::prefix('caracteristicasunidadconstruccion')->group(function () {
        Route::get('convencional', ConvencionalIndexController::class);
        Route::get('convencional/{id}', ConvencionalShowController::class);
        Route::post('convencional', ConvencionalStoreController::class);
        Route::get('no-convencional', NoConvencionalIndexController::class);
        Route::get('no-convencional/{id}', NoConvencionalShowController::class);
        Route::post('no-convencional', NoConvencionalStoreController::class);
    });

    Route::prefix('avaluo-catastral')->group(function () {
        Route::get('urbano/valor-terreno', ListValorTerrenoUrbanoController::class);
        Route::get('rural/valor-terreno', ListValorTerrenoRuralController::class);
        Route::get('tipo/tab-viv', ListTabViv60UrbanaRuralController::class);
        Route::get('tipo/santa-maria', ListTabSantaMariaDeLosAngelesUrbanaLocalController::class);
        Route::get('tipo/tab-com', ListTabCom60UrbanaRuralLocalController::class);
        Route::get('tipo/tab-bod', ListTabBod60UrbanaRuralLocalController::class);
        Route::get('tipo/tab-hot', ListTabHot60UrbanaRuralLocalController::class);
        Route::get('tipo/tab-cc-f03', ListTabCcF0360UrbanaRuralLocalController::class);
        Route::get('tipo/tab-anexos', ListTabAnexosUrbanaRuralLocalController::class);
        Route::post('calcular/incremento', CalcularIncrementoAvaluoController::class);
    });

    Route::prefix('interesados')->group(function () {
        Route::post('', StoreColMiembros::class);
        Route::get('{nit}', Show::class);
    });

    Route::post('derecho/local', StoreDerechoLocal::class);

    Route::post('datos-condominio/local', StoreDatosCondominioLocal::class);

    Route::post('predio-copropiedad/local', StorePredioCopropiedadLocal::class);

    Route::post('ric-predio/local', StoreRicPredioLocal::class);

    Route::post('ric-tramite-catastral/local', StoreRicTramiteCatastralLocal::class);

    Route::post('fuente-administrativa/local', StoreFuenteAdministrativaLocal::class);

    Route::post('terreno/local', StoreTerrenoLocal::class);

    Route::post('datos-adicionales/local', StoreDatosadicionaleslevantamientocatastralLocal::class);

    Route::post('contacto-visita/local', StoreContactoVisitaLocal::class);

    Route::post('unidad/construccion/local', StoreUnidadConstruccionLocal::class);
    Route::post('construccion/local', StoreConstruccionLocal::class);
    Route::post('construccion/documentos', StoreDocuments::class);

    Route::post('rrrfuente/fuente-administrativa/derecho', StoreFuenteAdministrativaDerechoController::class);

    Route::post('document/generate', GenerateDocumentPdf::class);

});
