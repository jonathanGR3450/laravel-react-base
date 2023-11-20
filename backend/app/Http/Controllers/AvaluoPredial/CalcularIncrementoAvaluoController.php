<?php

namespace App\Http\Controllers\AvaluoPredial;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\AvaluoPredial\CalcularIncrementoAvaluoFormRequest;
use App\Models\Local\LcValorTerrenoRuralLocal;
use App\Models\Local\LcValorTerrenoUrbanaLocal;
use App\Models\Local\TabAnexosUrbanaRuralLocal;
use App\Models\Local\TabBod60UrbanaRuralLocal;
use App\Models\Local\TabCcF0360UrbanaRuralLocal;
use App\Models\Local\TabCom60UrbanaRuralLocal;
use App\Models\Local\TabHot60UrbanaRuralLocal;
use App\Models\Local\TabSantaMariaDeLosAngelesUrbanaLocal;
use App\Models\Local\TabViv60UrbanaRuralLocal;
use Exception;

class CalcularIncrementoAvaluoController extends AppBaseController
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
    public function __invoke(CalcularIncrementoAvaluoFormRequest $request)
    {
        try {
            $vigencia = $request->input('vigencia');
            $vigenciaAnterior = $vigencia - 1;
            $incremento = $request->input('incremento');
            $tablas = $request->input('tablas');

            foreach ($tablas as $tabla) {
                switch ($tabla) {
                    case 'lc_valor_terreno_rural':
                        $result = LcValorTerrenoRuralLocal::where('vigencia', $vigenciaAnterior)->get();
                        foreach ($result as $model) {
                            $newModel = $model->replicate();
                            $newModel->vigencia = $vigencia;
                            $newModel->valor_ha = $model->valor_ha * $incremento;
                            $newModel->valor_m2 = $model->valor_m2;
                            $newModel->save();
                        }
                        break;
                    case 'tab_anexos_urbana_rural':
                        $query = TabAnexosUrbanaRuralLocal::query();
                        $this->copyModelIncrement($query, $vigencia, $incremento);
                        break;
                    case 'tab_cc_f03_60_urbana_rural':
                        $query = TabCcF0360UrbanaRuralLocal::query();
                        $this->copyModelIncrement($query, $vigencia, $incremento);
                        break;
                    case 'tab_hot_60_urbana_rural':
                        $query = TabHot60UrbanaRuralLocal::query();
                        $this->copyModelIncrement($query, $vigencia, $incremento);
                        break;
                    case 'tab_bod_60_urbana_rural':
                        $query = TabBod60UrbanaRuralLocal::query();
                        $this->copyModelIncrement($query, $vigencia, $incremento);
                        break;
                    case 'tab_com_60_urbana_rural':
                        $query = TabCom60UrbanaRuralLocal::query();
                        $this->copyModelIncrement($query, $vigencia, $incremento);
                        break;
                    case 'tab_santa_maria_de_los_angeles_urbana':
                        $query = TabSantaMariaDeLosAngelesUrbanaLocal::query();
                        $this->copyModelIncrement($query, $vigencia, $incremento);
                        break;
                    case 'tab_viv_60_urbana_rural':
                        $query = TabViv60UrbanaRuralLocal::query();
                        $this->copyModelIncrement($query, $vigencia, $incremento);
                        break;
                    case 'lc_valor_terreno_urbana':
                        $query = LcValorTerrenoUrbanaLocal::query();
                        $this->copyModelIncrement($query, $vigencia, $incremento);
                        break;
                    
                    default:
                        throw new Exception("La tabla $tabla no esta definida en el sistema", 1);
                        break;
                }
            }

            return $this->sendSuccess("incremento generado correctamente para la tabla $tabla");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
        
    }

    function copyModelIncrement($query, $vigencia, $incremento) : void {
        $vigenciaAnterior = $vigencia - 1;
        
        $queryDelete = clone $query;
        $queryDelete->where('vigencia', $vigencia)->delete();

        $result = $query->where('vigencia', $vigenciaAnterior)->get();
        foreach ($result as $model) {
            $newModel = $model->replicate();
            $newModel->vigencia = $vigencia;
            $newModel->valor = $model->valor * $incremento;
            $newModel->save();
        }
    }
}
