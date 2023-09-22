<?php

namespace App\Http\Resources\Cafificacion;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConvencionalResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return [
            "identificador" => $this->identificador,
            "tipo_construccion" => [
                't_id' => $this->tipoConstruccion->t_id,
                'dispname' => $this->tipoConstruccion->dispname,
            ],
            "tipo_dominio" => [
                't_id' => $this->tipoDominio->t_id,
                'dispname' => $this->tipoDominio->dispname,
            ],
            "tipo_unidad_construccion" => [
                't_id' => $this->tipoUnidadConstruccion->t_id,
                'dispname' => $this->tipoUnidadConstruccion->dispname,
            ],
            "tipo_planta" => [
                't_id' => $this->tipoPlanta->t_id,
                'dispname' => $this->tipoPlanta->dispname,
            ],
            "total_plantas" => $this->total_plantas,
            "total_habitaciones" => $this->total_habitaciones,
            "total_banios" => $this->total_banios,
            "total_locales" => $this->total_locales,
            "anio_construccion" => $this->anio_construccion,
            "uso" => [
                't_id' => $this->usoConstruccion->t_id,
                'dispname' => $this->usoConstruccion->dispname,
            ],
            "avaluo_unidad_construccion" => $this->avaluo_unidad_construccion,
            "area_construida" => $this->area_construida,
            "area_privada_construida" => $this->area_privada_construida,
            "comienzo_vida_util_version" => $this->comienzo_vida_util_version,
            "fin_vida_util_version" => $this->fin_vida_util_version,
            "espacio_de_nombres" => $this->espacio_de_nombres,
            "local_id" => $this->local_id,
            "observaciones" => $this->observaciones,
            "sync" => $this->sync,
            "calificacionconvencional" => $this->calificacionConvencional?->transform(function ($item) {
                return [
                    "tipo_calificar" => [
                        't_id' => $item->tipoCalificar->t_id,
                        'dispname' => $item->tipoCalificar->dispname,
                    ],
                    "total_calificacion" => $item->total_calificacion,
                    "grupocalificacion" => $item->grupoCalificacion?->transform(function ($item) {
                        return [
                            "clase_calificacion" => [
                                't_id' => $item->claseCalificacion->t_id,
                                'dispname' => $item->claseCalificacion->dispname,
                            ],
                            "conservacion" => [
                                't_id' => $item->estadoConservacion->t_id,
                                'dispname' => $item->estadoConservacion->dispname,
                            ],
                            "subtotal" => $item->subtotal,
                            "objetoconstruccion" => $item->objetoConstruccion?->transform(function ($item) {
                                return [
                                    "tipo_objeto_construccion" => [
                                        't_id' => $item->tipoObjetoConstruccion->t_id,
                                        'dispname' => $item->tipoObjetoConstruccion->dispname,
                                    ],
                                    "puntos" => $item->puntos
                                ];
                            })
                        ];
                    })
                ];
            }),
        ];
    }
}
