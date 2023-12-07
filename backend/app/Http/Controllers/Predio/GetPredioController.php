<?php

namespace App\Http\Controllers\Predio;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Predio\IndexPredioFormRequest;
use App\Http\Resources\Predio\PredioResource;
use App\Models\LcPredio;
use Exception;

class GetPredioController extends AppBaseController
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
    public function __invoke(IndexPredioFormRequest $request)
    {
        try {
            $matricula = $request->input('matricula_inmobiliaria');
            $predial = $request->input('numero_predial');

            if (!$matricula && !$predial) {
                throw new Exception('matricula_inmobiliaria o numero_predial son requeridos');
            }

            $predio = LcPredio::when($predial, function ($query) use ($predial) {
                $query->where('numero_predial', $predial);
            })->when($matricula, function ($query) use ($matricula) {
                $query->where('matricula_inmobiliaria', $matricula);
            })->get()->first();
            

            $predioResource = new PredioResource($predio);
            return $this->sendResponse($predioResource, 'lc predio obtenido correctamente');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
        
    }
}
