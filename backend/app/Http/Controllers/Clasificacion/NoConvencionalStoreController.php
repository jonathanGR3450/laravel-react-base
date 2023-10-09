<?php

namespace App\Http\Controllers\Clasificacion;

use App\Http\Controllers\AppBaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\ValidarConstruccionesNoConvencionalesFormRequest;
use App\Models\Local\LcCaracteristicasUnidadConstruccionLocal;

class NoConvencionalStoreController extends AppBaseController
{
    /**
     * @OA\Post(
     *     path="/api/v1/caracteristicasunidadconstruccion/no-convencional",
     *     summary="Almacenar construcciones no convencionales",
     *     tags={"Construccion"},
     *     @OA\RequestBody(
     *        @OA\JsonContent(ref="#/components/schemas/ValidarConstruccionesNoConvencionalesFormRequest")
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
    public function __invoke(ValidarConstruccionesNoConvencionalesFormRequest $request)
    {
        try {
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
    
                foreach ($caracteristicas->calificacionnoconvencional as $calificacion) {
                    $calificacion = (object) $calificacion;
                    $calificacionNoConvencionalModel = $unidadConstruccionModel->calificacionNoConvencional()->create([
                        'tipo_anexo' => $calificacion->tipo_anexo,
                    ]);
                }
            }

            return $this->sendSuccess('Calificacion no convencional creada con exito');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
