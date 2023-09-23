<?php

namespace App\Http\Controllers\Clasificacion;

use App\Http\Controllers\AppBaseController;
use App\Http\Resources\Cafificacion\ConvencionalResource;
use App\Models\Local\LcCaracteristicasUnidadConstruccionLocal;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ConvencionalShowController extends AppBaseController
{
    /**
     * @OA\Get(
     *     path="/api/v1/caracteristicasunidadconstruccion/convencional/{id}",
     *     summary="Obtener información de una construccion por ID",
     *     tags={"Construccion"},
     *     security={{ "bearerAuth": {} }},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del Construccion a obtener",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Información del Construccion",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", description="Estado de la respuesta"),
     *             @OA\Property(property="message", type="string", description="Mensaje de la respuesta"),
     *             @OA\Property(property="data", type="array", description="Datos de la Construccion", @OA\Items(
     *                  ref="#/components/schemas/ConvencionalResource"
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
    public function __invoke(Request $request, int $id)
    {
        try {
            $convecional = LcCaracteristicasUnidadConstruccionLocal::findOrFail($id);
    
            if ($convecional->tipoConstruccion->ilicode !== 'Convencional') {
                return response()->json(['errors' => [
                    "Esta unidad de construccion es no convencional"
                ]], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
            }
    
            $convencionalResource = new ConvencionalResource($convecional);
            return $this->sendResponse($convencionalResource, "calificacion convencional get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
