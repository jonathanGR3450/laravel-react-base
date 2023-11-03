<?php

namespace App\Http\Controllers\Predio;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\StoreFuenteAdministrativaDerechosFormRequest;
use App\Http\Requests\StoreNumerosPredialesFormRequest;
use App\Http\Requests\StoreNumerosPredialesHomologadosFormRequest;
use App\Models\Local\ColRrrfuenteLocal;
use App\Models\Local\ExtDireccionLocal;
use App\Models\Local\LcNumerosHomologadosLocal;
use App\Models\Local\LcNumerosPredialLocal;
use Illuminate\Support\Facades\DB;

class StoreFuenteAdministrativaDerechoController extends AppBaseController
{
    /**
     * @OA\Post(
     *     path="/api/v1/numero/numeros-prediales",
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
    public function __invoke(StoreFuenteAdministrativaDerechosFormRequest $request)
    {
        try {
            $numerosRelacion = $request->input('numeros_relacion', []);
            $ids = [];
            foreach ($numerosRelacion as $numero) {
                $rFuente = ColRrrfuenteLocal::create($numero);
                $ids[] = $rFuente->t_id;
            }
            return $this->sendResponse($ids, 'rrr fuente successful');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}