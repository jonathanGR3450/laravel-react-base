<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\AvaluoPredial\CalcularIncrementoAvaluoController;
use App\Http\Controllers\AvaluoPredial\ListIncrementosController;
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
use App\Http\Controllers\RicPredioTramiteCatastral\StoreLocal AS StoreRicPredioTramiteCatastralLocal;
use App\Http\Controllers\FuenteAdministrativa\StoreLocal AS StoreFuenteAdministrativaLocal;
use App\Http\Controllers\Datosadicionaleslevantamientocatastral\StoreLocal AS StoreDatosadicionaleslevantamientocatastralLocal;
use App\Http\Controllers\ContactoVisita\StoreLocal AS StoreContactoVisitaLocal;
use App\Http\Controllers\Terreno\StoreLocal AS StoreTerrenoLocal;
use App\Http\Controllers\Terreno\UpdateLocal AS UpdateTerrenoLocal;
use App\Http\Controllers\Clasificacion\StoreLocal AS StoreCaracterisitcasLocal;
use App\Http\Controllers\Construccion\StoreLocal AS StoreConstruccionLocal;
use App\Http\Controllers\Construccion\UpdateLocal AS UpdateConstruccionLocal;
use App\Http\Controllers\UnidadConstruccion\StoreLocal AS StoreUnidadConstruccionLocal;
use App\Http\Controllers\UnidadConstruccion\MigrarLocal AS MigrarUnidadConstruccionLocal;
use App\Http\Controllers\TramiteRadicado\StoreLocal AS StoreTramiteRadicadoLocal;
use App\Http\Controllers\TramiteRadicado\UpdateLocal AS UpdateTramiteRadicadoLocal;
use App\Http\Controllers\TramiteRadicado\IndexLocal AS IndexLocalTramiteRadicadoLocal;
use App\Http\Controllers\ExtDireccion\StoreLocal AS StoreExtDireccionLocal;
use App\Http\Controllers\Document\GenerateDocumentPdf;
use App\Http\Controllers\Document\ListRadicadoController;
use App\Http\Controllers\Document\ListTipoTramiteController;
use App\Http\Controllers\Interesado\Show;
use App\Http\Controllers\Interesado\StoreAgrupacionInteresadoLocal;
use App\Http\Controllers\Interesado\StoreColMiembrosLocal;
use App\Http\Controllers\Interesado\StoreInteresadoLocal;
use App\Http\Controllers\Predio\GetPredioController;
use App\Http\Controllers\Predio\GetPredioNumeroPredialController;
use App\Http\Controllers\Predio\GetPrediosByNumeroPredialController;
use App\Http\Controllers\Predio\GetPrediosByNumeroPredialLocalController;
use App\Http\Controllers\Predio\IndexNumerosHomologadosController;
use App\Http\Controllers\Predio\IndexNumerosPredialesController;
use App\Http\Controllers\Predio\MigracionConservacionController;
use App\Http\Controllers\Predio\StoreColUebaunitLocal;
use App\Http\Controllers\Predio\StoreColUnidadfuenteLocal;
use App\Http\Controllers\Predio\StoreFuenteAdministrativaDerechoController;
use App\Http\Controllers\Predio\StoreLcPredio;
use App\Http\Controllers\Predio\StoreNumeroHomologadosController;
use App\Http\Controllers\Predio\StoreNumeroPredialController;
use App\Http\Controllers\Predio\StoreNumeroPredialHomologadoController;
use App\Http\Controllers\Predio\UpdateLcPredio;
use App\Http\Controllers\RicTramiteCatastral\IndexLocal AS IndexLocalRicTramiteCatastral;
use App\Http\Controllers\Terreno\MigrateLocal;
use App\Http\Controllers\Clasificacion\MigrateLocal AS MigrateCareacteristicasLocal;
use App\Http\Controllers\Construccion\MigrateLocal AS MigrateConstruccionLocal;
use App\Http\Controllers\Derecho\MigrateLocal AS MigrateDerechoLocal;
use App\Http\Controllers\Predio\MigrateLocal AS MigratePredioLocal;
use App\Http\Controllers\Clasificacion\StoreCalificacionConvencionalLocal;
use App\Http\Controllers\Clasificacion\StoreCalificacionNoConvencionalLocal;
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
        Route::get('', GetPredioController::class);
        Route::put('{id}', UpdateLcPredio::class);
        Route::post('uebaunit', StoreColUebaunitLocal::class);
        Route::post('uebaunit/local/migrar', MigratePredioLocal::class);


        Route::post('unidadfuente', StoreColUnidadfuenteLocal::class);
        Route::get('numero-predial', GetPredioNumeroPredialController::class);
        Route::post('numeros-prediales/numeros-homologados', StoreNumeroPredialHomologadoController::class);
        Route::post('numeros-prediales', StoreNumeroPredialController::class);
        Route::get('numeros-homologados', IndexNumerosHomologadosController::class);
        Route::post('numeros-homologados', StoreNumeroHomologadosController::class);
        Route::get('list/numeros-prediales/{numero_predial}/', GetPrediosByNumeroPredialController::class);
        Route::get('list/local/numeros-prediales/{numero_predial}/', GetPrediosByNumeroPredialLocalController::class);
        Route::get('list/local/numeros-prediales', IndexNumerosPredialesController::class);

        Route::post('migracion/conservacion', MigracionConservacionController::class);
    });

    Route::prefix('caracteristicasunidadconstruccion')->group(function () {

        Route::post('local', StoreCaracterisitcasLocal::class);
        Route::post('local/migrar', MigrateCareacteristicasLocal::class);

        Route::put('calificacionconvencional/local/{id}', StoreCalificacionConvencionalLocal::class);
        Route::put('calificacionnoconvencional/local/{id}', StoreCalificacionNoConvencionalLocal::class);


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

        Route::get('list/incrementos', ListIncrementosController::class);
    });

    Route::prefix('interesados')->group(function () {
        Route::post('interesado', StoreInteresadoLocal::class);
        Route::post('agrupacioninteresados', StoreAgrupacionInteresadoLocal::class);
        Route::post('miembros', StoreColMiembrosLocal::class);
        Route::get('{nit}', Show::class);
    });

    Route::post('derecho/local', StoreDerechoLocal::class);
    Route::post('derecho/local/migrar', MigrateDerechoLocal::class);

    Route::post('datos-condominio/local', StoreDatosCondominioLocal::class);
    Route::post('predio-copropiedad/local', StorePredioCopropiedadLocal::class);
    Route::post('ric-predio/local', StoreRicPredioLocal::class);

    Route::get('ric-tramite-catastral/local/list', IndexLocalRicTramiteCatastral::class);
    Route::post('ric-tramite-catastral/local', StoreRicTramiteCatastralLocal::class);


    Route::post('ric-predio-tramite-catastral/local', StoreRicPredioTramiteCatastralLocal::class);
    Route::post('fuente-administrativa/local', StoreFuenteAdministrativaLocal::class);

    Route::prefix('terreno')->group(function () {
        Route::post('local', StoreTerrenoLocal::class);
        Route::post('local/migrar', MigrateLocal::class);
        Route::put('local/{id}', UpdateTerrenoLocal::class);
    });

    Route::post('datos-adicionales/local', StoreDatosadicionaleslevantamientocatastralLocal::class);

    Route::post('contacto-visita/local', StoreContactoVisitaLocal::class);

    Route::post('unidad/construccion/local', StoreUnidadConstruccionLocal::class);
    Route::post('unidad/construccion/local/migrar', MigrarUnidadConstruccionLocal::class);
    Route::post('construccion/local/migrar', MigrateConstruccionLocal::class);
    Route::post('construccion/local', StoreConstruccionLocal::class);
    Route::put('construccion/local/{id}', UpdateConstruccionLocal::class);
    Route::post('construccion/documentos', StoreDocuments::class);

    Route::post('rrrfuente/fuente-administrativa/derecho', StoreFuenteAdministrativaDerechoController::class);

    Route::prefix('document')->group(function () {
        Route::post('generate', GenerateDocumentPdf::class);
        Route::get('list/tipo-tramite', ListTipoTramiteController::class);
        Route::get('list/radicados', ListRadicadoController::class);
    });

    Route::prefix('tramite-radicado')->group(function () {
        Route::post('', StoreTramiteRadicadoLocal::class);
        Route::put('{id}', UpdateTramiteRadicadoLocal::class);
        Route::get('', IndexLocalTramiteRadicadoLocal::class);
    });

    Route::prefix('extdireccion')->group(function () {
        Route::post('', StoreExtDireccionLocal::class);
    });
});
