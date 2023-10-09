<?php

namespace App\Http\Controllers\Predio;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\StoreNumerosHomologadosFormRequest;
use App\Models\Local\LcNumerosHomologadosLocal;
use Exception;
use League\Csv\Reader;


class StoreNumeroHomologadosController extends AppBaseController
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
    public function __invoke(StoreNumerosHomologadosFormRequest $request)
    {
        try {
            $numerosHomologados = $request->file('numeros_homologados_csv');

            if ($numerosHomologados->isValid()) {
                $contenido = file_get_contents($numerosHomologados->getRealPath());
                $csv = Reader::createFromString($contenido);
                $registros = $csv->getRecords();
                
                foreach ($registros as $registro) {
                    LcNumerosHomologadosLocal::create([
                        'numeros_homologados' => $registro[0]
                    ]);
                }
        
                return $this->sendSuccess('Numeros Homologados store successful');
            } else {
                throw new Exception("El archivo CSV no es válido.");
            }
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
