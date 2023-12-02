<?php

namespace App\Http\Controllers;

use App\Http\Resources\Predio\PredioResource;
use App\Models\LcPredio;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;

class GetPredioController extends Controller
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
    public function __invoke(string $predial)
    {
        try {
            $predio = LcPredio::where('numero_predial', $predial)->get()->first();

            $predioResource = new PredioResource($predio);
            return response()->json([
                "status" => "successful",
                "message" => "Predio get successfull",
                "data" => $predioResource
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage()
            ], 400, []);
        }
        
    }
}
