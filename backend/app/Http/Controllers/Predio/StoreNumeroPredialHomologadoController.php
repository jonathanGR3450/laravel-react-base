<?php

namespace App\Http\Controllers\Predio;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\StoreNumerosPredialesFormRequest;
use App\Http\Requests\StoreNumerosPredialesHomologadosFormRequest;
use App\Models\Local\ExtDireccionLocal;
use App\Models\Local\LcNumerosHomologadosLocal;
use App\Models\Local\LcNumerosPredialLocal;
use Illuminate\Support\Facades\DB;

class StoreNumeroPredialHomologadoController extends AppBaseController
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
    public function __invoke(StoreNumerosPredialesHomologadosFormRequest $request)
    {
        try {
            $numerosRelacion = $request->input('numeros_relacion', []);
            foreach ($numerosRelacion as $numero) {
                $numero = (object) $numero;
                // dd($numero);
                $numeroPredial = LcNumerosPredialLocal::where('numero_predial', $numero->numero_predial)->get()->first();
                $numeroHomologado = LcNumerosHomologadosLocal::where('numeros_homologados', $numero->numero_homologado)->get()->first();
                
                $numeroHomologado->lc_numeros_prediales_id = $numeroPredial->t_id;
                $numeroHomologado->save();
            }
            return $this->sendSuccess('Numeros Prediales y Numeros Homologados Relacionados successful');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
