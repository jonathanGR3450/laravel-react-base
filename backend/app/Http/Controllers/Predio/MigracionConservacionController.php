<?php

namespace App\Http\Controllers\Predio;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Predio\MigracionConservacionFormRequest;
use App\Models\ColUebaunit;
use App\Models\LcConstruccion;
use App\Models\LcPredio;
use App\Models\LcTerreno;
use App\Models\LcUnidadconstruccion;
use App\Models\Local\LcPredioLocal;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MigracionConservacionController extends AppBaseController
{
    /**
     * @OA\Get(
     *     path="/api/v1/predio/{id}",
     *     summary="Obtener información de un predio por ID",
     *     tags={"Predio"},
     *     security={{ "bearerAuth": {} }},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del predio a obtener",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Información del predio",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", description="Estado de la respuesta"),
     *             @OA\Property(property="message", type="string", description="Mensaje de la respuesta"),
     *             @OA\Property(property="data", type="array", description="Datos del predio", @OA\Items(
     *                  ref="#/components/schemas/PredioResource"
     *              )),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", description="Estado de la respuesta"),
     *             @OA\Property(property="message", type="string", description="Mensaje de error"),
     *         ),
     *     ),
     * )
     */
    public function __invoke(MigracionConservacionFormRequest $request)
    {
        try {
            $predioId = $request->input('predio');

            $predioLocal = LcPredioLocal::find($predioId)->makeHidden(['t_id']);

            $predioData = $predioLocal->toArray();
            $predioData['t_ili_tid'] = Str::uuid();
            $predioData['comienzo_vida_util_version'] = Carbon::now();

            $predioConservacion = LcPredio::create($predioData);

            // aqui va la tabla extdireccion

            // // lc_predio_copropiedad
            // $matrizCopropiedadLocal = $predioLocal->matrizCopropiedad;
            // if ($matrizCopropiedadLocal) {
            //     // validar que no exista
            //     $matrizCopropiedadLocalData = $matrizCopropiedadLocal->makeHidden(['t_id'])->toArray();
            //     $matrizCopropiedadLocalData['matriz'] = $predioConservacion->t_id;
            //     $matrizCopropiedadLocalData['unidad_predial'] = $predioConservacion->t_id;
            //     $predioConservacion->matrizCopropiedad()->create($matrizCopropiedadLocalData);
            // }

            // // lc_datosadicionaleslevantamientocatastral
            // $datosAdicionalesLevantamientoCatastral = $predioLocal->datosAdicionalesLevantamientoCatastral;
            // if ($datosAdicionalesLevantamientoCatastral) {
            //     $datosAdicionalesLevantamientoCatastralData = $datosAdicionalesLevantamientoCatastral->makeHidden(['t_id'])->toArray();
            //     $datosAdicionalesLevantamientoCatastralData['lc_predio'] = $predioConservacion->t_id;
            //     $predioConservacion->datosAdicionalesLevantamientoCatastral()->create($datosAdicionalesLevantamientoCatastralData);
            // }

            // // lc_datosphcondominio
            // $lcDatosPhCondominio = $predioLocal->lcDatosPhCondominio;
            // if ($lcDatosPhCondominio) {
            //     $lcDatosPhCondominioData = $lcDatosPhCondominio->makeHidden(['t_id'])->toArray();
            //     $lcDatosPhCondominioData['lc_predio'] = $predioConservacion->t_id;
            //     $predioConservacion->lcDatosPhCondominio()->create($lcDatosPhCondominioData);
            // }

            // col_uebaunit
            $uebaunit = $predioLocal->uebaunit;
            if ($uebaunit->count() > 0) {
                foreach ($uebaunit as $data) {
                    // lc_construccion
                    $construccion = $data->construccion;
                    $lcConstruccion = null;
                    // if ($construccion) {
                    //     $construccionData = $construccion->makeHidden(['t_id'])->toArray();
                    //     $construccionData['local_id'] = $predioConservacion->local_id;
                    //     $lcConstruccion = LcConstruccion::create($construccionData);
                    // }

                    // lc_terreno
                    $terreno = $data->terreno;
                    $lcTerreno = null;
                    if ($terreno) {
                        $terrenoData = $terreno->makeHidden(['t_id'])->toArray();
                        // agregar geometria
                        $terrenoData['geometria'] = DB::raw("ST_SetSRID(ST_MakePolygon(ST_MakePoint(4848927.985, 2038128.138, 0), ST_MakePoint(4848928.0, 2038128.0, 0), ST_MakePoint(4848928.0, 2038129.0, 0), ST_MakePoint(4848927.985, 2038128.138, 0))), 9377)");
                        $lcTerreno = LcTerreno::create($terrenoData);
                    }
                    dd('insert');

                    // lc_unidadconstruccion
                    $unidadConstruccion = $data->unidadConstruccion;
                    $lcUnidadConstruccion = null;
                    if ($unidadConstruccion) {
                        $unidadConstruccionData = $unidadConstruccion->makeHidden(['t_id'])->toArray();
                        $lcUnidadConstruccion = LcUnidadconstruccion::create($unidadConstruccionData);
                    }

                    // col_uebaunit
                    $uebaunitData = [
                        'ue_lc_unidadconstruccion' => $lcUnidadConstruccion?->t_id,
                        'ue_lc_construccion' => $lcConstruccion?->t_id,
                        'ue_lc_terreno' => $lcTerreno?->t_id,
                        'baunit' => $predioConservacion->t_id,
                    ];
                    $colUebaunitConservacion = ColUebaunit::create($uebaunitData);

                }
            }

            return $this->sendSuccess('datos migrados correctamente');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
        
    }
}
