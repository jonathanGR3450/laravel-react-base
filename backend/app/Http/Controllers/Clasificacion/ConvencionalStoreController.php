<?php

namespace App\Http\Controllers\Clasificacion;

use App\Http\Controllers\AppBaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\ValidarConstruccionesFormRequest;
use App\Http\Resources\Cafificacion\ConvencionalCollection;
use App\Models\Local\LcCaracteristicasUnidadConstruccionLocal;
use App\Traits\PaginationTrait;

class ConvencionalStoreController extends AppBaseController
{
    use PaginationTrait;

    /**
     * @OA\Post(
     *     path="/api/v1/caracteristicasunidadconstruccion/convencional",
     *     summary="Almacenar construcciones convencionales",
     *     tags={"Construccion"},
     *     @OA\RequestBody(
     *        @OA\JsonContent(ref="#/components/schemas/ValidarConstruccionesFormRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Contruccion creada correctamente",
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
    public function __invoke(ValidarConstruccionesFormRequest $request)
    {
        try {
            $ids = [];
            $construcciones = $request->input('construcciones', []);
            foreach ($construcciones as $construccion) {
                $caracteristicas = (object) $construccion['caracteristicasunidadconstruccion'];
                
                $unidadConstruccionModel = LcCaracteristicasUnidadConstruccionLocal::create([
                    'identificador' => $caracteristicas->identificador,
                    'tipo_construccion' => $caracteristicas->tipo_construccion,
                    'tipo_dominio' => $caracteristicas->tipo_dominio,
                    'tipo_unidad_construccion' => $caracteristicas->tipo_unidad_construccion,
                    'tipo_planta' => $caracteristicas->tipo_planta,
                    'total_plantas' => $caracteristicas->total_plantas,
                    'total_habitaciones' => $caracteristicas->total_habitaciones,
                    'total_banios' => $caracteristicas->total_banios,
                    'total_locales' => $caracteristicas->total_locales,
                    'anio_construccion' => $caracteristicas->anio_construccion,
                    'uso' => $caracteristicas->uso,
                    'avaluo_unidad_construccion' => $caracteristicas->avaluo_unidad_construccion,
                    'area_construida' => $caracteristicas->area_construida,
                    'area_privada_construida' => $caracteristicas->area_privada_construida,
                    'comienzo_vida_util_version' => date('Y-m-d H:i:s'),
                    'fin_vida_util_version' => $caracteristicas->fin_vida_util_version,
                    'espacio_de_nombres' => $caracteristicas->espacio_de_nombres,
                    'local_id' => $caracteristicas->local_id,
                    'observaciones' => $caracteristicas->observaciones,
                ]);
                $ids[] = $unidadConstruccionModel->t_id;
    
                foreach ($caracteristicas->calificacionconvencional as $calificacion) {
                    $calificacion = (object) $calificacion;
                    $calificacionConvencionalModel = $unidadConstruccionModel->calificacionConvencional()->create([
                        'tipo_calificar' => $calificacion->tipo_calificar,
                        'total_calificacion' => $calificacion->total_calificacion,
                    ]);
    
                    foreach ($calificacion->grupocalificacion as $grupo) {
                        $grupo = (object) $grupo;
                        $grupoCalificacionModel = $calificacionConvencionalModel->grupoCalificacion()->create([
                            'clase_calificacion' => $grupo->clase_calificacion,
                            'conservacion' => $grupo->conservacion,
                            'subtotal' => $grupo->subtotal,
                        ]);
    
                        foreach ($grupo->objetoconstruccion as $objeto) {
                            $objeto = (object) $objeto;
                            $objetoModel = $grupoCalificacionModel->objetoConstruccion()->create([
                                'tipo_objeto_construccion' => $objeto->tipo_objeto_construccion,
                                'puntos' => $objeto->puntos,
                            ]);
                        }
                    }
                }
            }

            // dd($ids);
            
            /**pagination */
            $sortable = [
                'name'    => 't_id',
            ];
            $query = LcCaracteristicasUnidadConstruccionLocal::whereIn('t_id', $ids);
            $query = $this->paginationQuery($query, $sortable, $request);
            $convencionalesCollection = new ConvencionalCollection($query);

            return $this->sendResponse($convencionalesCollection, 'Calificacion convencional creada con exito');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
