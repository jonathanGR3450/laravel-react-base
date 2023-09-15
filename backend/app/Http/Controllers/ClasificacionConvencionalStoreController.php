<?php

namespace App\Http\Controllers;

use App\Http\Requests\ValidarConstruccionesFormRequest;
use App\Models\Local\LcCaracteristicasUnidadConstruccionLocal;

class ClasificacionConvencionalStoreController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(ValidarConstruccionesFormRequest $request)
    {
        // dd($request->validated());
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

        return response()->json([
            'status' => true,
            'message' => 'Calificacion convencional creada con exito',
            'data' => null
        ]);
    }
}
