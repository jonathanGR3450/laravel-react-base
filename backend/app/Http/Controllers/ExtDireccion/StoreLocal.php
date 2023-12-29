<?php

namespace App\Http\Controllers\ExtDireccion;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\ExtDireccion\StoreFormRequest;
use App\Http\Requests\StoreNumerosPredialesFormRequest;
use App\Models\Local\ExtDireccionLocal;
use App\Models\Local\LcNumerosPredialLocal;
use Illuminate\Support\Facades\DB;

class StoreLocal extends AppBaseController
{
    /**
     * @OA\Post(
     *     path="/api/v1/predio/numeros-prediales",
     *     summary="Almacenar números prediales",
     *     tags={"Predio"},
     *     @OA\RequestBody(
     *        @OA\JsonContent(ref="#/components/schemas/StoreNumerosPredialesFormRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Inicio de sesión exitoso",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", description="Estado de la peticion"),
     *             @OA\Property(property="message", type="string", description="Mensaje"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", description="Estado de la peticion"),
     *             @OA\Property(property="message", type="string", description="Mensaje"),
     *         ),
     *     ),
     * )
     */
    public function __invoke(StoreFormRequest $request)
    {
        try {
            $direccion = ExtDireccionLocal::create($request->validated());
            return $this->sendResponse($direccion, 'Direccion store successful');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
