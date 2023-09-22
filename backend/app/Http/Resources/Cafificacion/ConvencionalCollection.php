<?php

namespace App\Http\Resources\Cafificacion;

use App\Http\Resources\Pagination\PaginationResourse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ConvencionalCollection extends ResourceCollection
{

    private $pagination;

    public function __construct($resource)
    {
        $this->pagination = new PaginationResourse($resource);
        parent::__construct($resource->getCollection());
    }
    
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return array_merge($this->pagination->resolve(), [
            "data" => $this->collection->transform(function ($item) {
                return [
                    "identificador" => $item->identificador,
                    "tipo_construccion" => [
                        't_id' => $item->tipoConstruccion->t_id,
                        'dispname' => $item->tipoConstruccion->dispname,
                    ],
                    "tipo_dominio" => [
                        't_id' => $item->tipoDominio->t_id,
                        'dispname' => $item->tipoDominio->dispname,
                    ],
                    "tipo_unidad_construccion" => [
                        't_id' => $item->tipoUnidadConstruccion->t_id,
                        'dispname' => $item->tipoUnidadConstruccion->dispname,
                    ],
                    "tipo_planta" => [
                        't_id' => $item->tipoPlanta->t_id,
                        'dispname' => $item->tipoPlanta->dispname,
                    ],
                    "total_plantas" => $item->total_plantas,
                    "total_habitaciones" => $item->total_habitaciones,
                    "total_banios" => $item->total_banios,
                    "total_locales" => $item->total_locales,
                    "anio_construccion" => $item->anio_construccion,
                    "uso" => [
                        't_id' => $item->usoConstruccion->t_id,
                        'dispname' => $item->usoConstruccion->dispname,
                    ],
                    "avaluo_unidad_construccion" => $item->avaluo_unidad_construccion,
                    "area_construida" => $item->area_construida,
                    "area_privada_construida" => $item->area_privada_construida,
                    "comienzo_vida_util_version" => $item->comienzo_vida_util_version,
                    "fin_vida_util_version" => $item->fin_vida_util_version,
                    "espacio_de_nombres" => $item->espacio_de_nombres,
                    "local_id" => $item->local_id,
                    "observaciones" => $item->observaciones,
                    "sync" => $item->sync,
                    "calificacionconvencional" => $item->calificacionConvencional?->transform(function ($item) {
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
            })
        ]);
        
    }
}
