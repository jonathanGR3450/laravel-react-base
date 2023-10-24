<?php

namespace App\Http\Controllers\Predio;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\IndexNumerosHomologadosFormRequest;
use App\Http\Requests\StoreNumerosHomologadosFormRequest;
use App\Http\Resources\Predio\NumeroHomologadosLocalCollection;
use App\Models\Local\LcNumerosHomologadosLocal;
use Exception;
use League\Csv\Reader;


class IndexNumerosHomologadosController extends AppBaseController
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
    public function __invoke(IndexNumerosHomologadosFormRequest $request)
    {
        try {
            $numerosHomologados = LcNumerosHomologadosLocal::where('taken', false)->limit($request->input('limit'))->get();
            $numerosHomologados = new NumeroHomologadosLocalCollection($numerosHomologados);
            return $this->sendResponse($numerosHomologados, "numeros homologados local get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
