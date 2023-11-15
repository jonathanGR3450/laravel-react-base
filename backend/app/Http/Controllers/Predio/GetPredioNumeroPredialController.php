<?php

namespace App\Http\Controllers\Predio;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Predio\ShowPredioFormRequest;
use App\Http\Resources\Predio\PredioNumeroPredialResource;
use App\Models\LcPredio;

class GetPredioNumeroPredialController extends AppBaseController
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
    public function __invoke(ShowPredioFormRequest $request)
    {
        try {
            $numeroPredial = $request->input('numero_predial');
            $predio = LcPredio::where('numero_predial', $numeroPredial)->get()->first();

            $predioResponse = new PredioNumeroPredialResource($predio);

            return $this->sendResponse($predioResponse, 'lc predio obtenido correctamente');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
        
    }
}
