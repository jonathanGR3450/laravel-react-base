<?php

namespace App\Http\Controllers\Predio;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\StoreNumerosPredialesFormRequest;
use App\Models\Local\ExtDireccionLocal;
use App\Models\Local\LcNumerosPredialLocal;
use Illuminate\Support\Facades\DB;

class StoreNumeroPredialController extends AppBaseController
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
    public function __invoke(StoreNumerosPredialesFormRequest $request)
    {
        try {
            $numerosPrediales = $request->input('numeros_prediales', []);
            foreach ($numerosPrediales as $predio) {
                $predio = (object) $predio;
                $predial = LcNumerosPredialLocal::create([
                    'numero_predial' => $predio->numero_predial,
                    'matricula_inmobiliaria' => $predio->matricula_inmobiliaria,
                ]);
                $direccionPredial = $predio->extdireccion;
                // $direccionPredial['localizacion'] = DB::raw("ST_Force3D(st_multi(st_buffer((ST_SetSRID(st_makepoint(4848927.985,2038128.138),9377)),1)))");
                $direccionPredial['localizacion'] = DB::raw("ST_GeomFromText('SRID=9377;POINT Z(4848927.985 2038128.138 0)', 9377)");
                $direccionPredial['lc_numeros_prediales_id'] = $predial->t_id;

                $direccion = ExtDireccionLocal::create($direccionPredial);
            }
            return $this->sendSuccess('Numeros Prediales store successful');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
