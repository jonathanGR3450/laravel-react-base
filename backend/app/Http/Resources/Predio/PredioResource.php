<?php

namespace App\Http\Resources\Predio;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PredioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "Predio" => [
                [
                    "Departamento" => $this->departamento,
                    "Municipio" => $this->municipio,
                    "Id_Operacion" => $this->id_Operacion,
                    "Tiene_FMI" => $this->tiene_fmi,
                    "Codigo_ORIP" => $this->codigo_orip,
                    "Matricula_Inmobiliaria" => $this->matricula_inmobiliaria,
                    "Referencia_Registral_Sistema_Antiguo" => [
                        "Tipo_Refencia" => $this->referenciasSistemaAntiguo?->tipo_referencia,
                        "Oficina" => $this->referenciasSistemaAntiguo?->oficina,
                        "Libro" => $this->referenciasSistemaAntiguo?->libro,
                        "Tomo" => $this->referenciasSistemaAntiguo?->tomo,
                        "Pagina" => $this->referenciasSistemaAntiguo?->pagina,
                        "Numero" => $this->referenciasSistemaAntiguo?->numero,
                        "Dia" => $this->referenciasSistemaAntiguo?->dia,
                        "Mes" => $this->referenciasSistemaAntiguo?->mes,
                        "Anio" => $this->referenciasSistemaAntiguo?->anio,
                        "Matricula" => $this->referenciasSistemaAntiguo?->matricula,
                    ],
                    "Numero_Predial" => $this->numero_predial,
                    "Numero_Predial_Anterior" => $this->numero_predial_anterior,
                    "Codigo_Homologado" => $this->codigo_homologado,
                    "Codigo_Homologado_FMI" => $this->codigo_homologado_fmi,
                    "NUPRE" => $this->nupre,
                    "Avaluo_Catastral" => $this->avaluo_catastral,
                    "Valor_Referencia" => $this->valor_referencia,
                    "Tipo" => [
                        [
                            "t_id" => $this->tipoPredio?->t_id,
                            "itfcode" => $this->tipoPredio?->itfcode,
                            "ilicode" => $this->tipoPredio?->ilicode,
                            "dispname" => $this->tipoPredio?->dispname,
                            "description" => $this->tipoPredio?->description,
                        ]
                    ],
                    "Condicion_Predio" => [
                        [
                            "t_id" => $this->condicionPredio?->t_id,
                            "itfcode" => $this->condicionPredio?->itfcode,
                            "ilicode" => $this->condicionPredio?->ilicode,
                            "dispname" => $this->condicionPredio?->dispname,
                            "description" => $this->condicionPredio?->description,
                        ]
                    ],
                    "Direccion" => $this->extDireccion->transform(function ($item) {
                        return [
                            "t_id" => $item->t_id,
                            "Tipo_Direccion" => $item->tipo_direccion,
                            "Es_Direccion_Principal" => $item->es_direccion_principal,
                            "Localizacion" => $item->localizacion,
                            "Codigo_Postal" => $item->codigo_postal,
                            "Clase_Via_Principal" => $item->clase_via_principal,
                            "Valor_Via_Principal" => $item->valor_via_principal,
                            "Letra_Via_Principal" => $item->letra_via_principal,
                            "Numero_Predio" => $item->numero_predio,
                            "Sector_Predio" => $item->sector_predio,
                            "Complemento" => $item->complemento,
                            "Nombre_Predio" => $item->nombre_predio,
                        ];
                    }),
                    "Destinacion_Economica" => [
                        [
                            "t_id" => $this->destinacionEconomica->t_id,
                            "itfcode" => $this->destinacionEconomica->itfcode,
                            "ilicode" => $this->destinacionEconomica->ilicode,
                            "dispname" => $this->destinacionEconomica->dispname,
                            "description" => $this->destinacionEconomica->description,
                        ]
                    ],
                    "Clase_Suelo" => [
                        [
                            "t_id" => $this->claseSuelo->t_id,
                            "itfcode" => $this->claseSuelo->itfcode,
                            "ilicode" => $this->claseSuelo->ilicode,
                            "dispname" => $this->claseSuelo->dispname,
                            "description" => $this->claseSuelo->description,
                        ]
                    ],
                    "Categoria_Suelo" => [
                        [
                            "t_id" => $this->categoriaSuelo?->t_id,
                            "itfcode" => $this->categoriaSuelo?->itfcode,
                            "ilicode" => $this->categoriaSuelo?->ilicode,
                            "dispname" => $this->categoriaSuelo?->dispname,
                            "description" => $this->categoriaSuelo?->description,
                        ]
                    ]
                ]
            ],
            "Datos_Adicionales_Levantamiento_Catastral" => [
                [
                    "Tiene_Area_Registral" => $this->datosAdicionalesLevantamientoCatastral?->tiene_area_registral,
                    "Area_Registral_M2" => $this->datosAdicionalesLevantamientoCatastral?->area_registral_m2,
                    "Procedimiento_Catastral_Registral" => [
                        [
                            "t_id" => $this->datosAdicionalesLevantamientoCatastral?->procedimientoCatastralRegistraltipo->t_id,
                            "itfcode" => $this->datosAdicionalesLevantamientoCatastral?->procedimientoCatastralRegistraltipo->itfcode,
                            "ilicode" => $this->datosAdicionalesLevantamientoCatastral?->procedimientoCatastralRegistraltipo->ilicode,
                            "dispname" => $this->datosAdicionalesLevantamientoCatastral?->procedimientoCatastralRegistraltipo->dispname,
                            "description" => $this->datosAdicionalesLevantamientoCatastral?->procedimientoCatastralRegistraltipo->description,
                        ]
                    ],
                    "Novedad_Numeros_Prediales" => $this->datosAdicionalesLevantamientoCatastral?->estructuraNovedadNumeroPredial->transform(function ($item) {
                        return [
                            "t_id" => $item->t_id,
                            "t_seq" => $item->t_seq,
                            "numero_predial" => $item->numero_predial,
                            "tipo_novedad" => $item->tipo_novedad,
                        ];
                    }),
                    "Novedad_FMI" => $this->datosAdicionalesLevantamientoCatastral?->estructuraNovedadFMI->transform(function ($item) {
                        return [
                            "t_id" => $item->t_id,
                            "t_seq" => $item->t_seq,
                            "codigo_orip" => $item->codigo_orip,
                            "numero_fmi" => $item->numero_fmi,
                        ];
                    }),
                    "Observaciones" => $this->datosAdicionalesLevantamientoCatastral?->observaciones,
                    "Fecha_Visita_predial" => $this->datosAdicionalesLevantamientoCatastral?->fecha_visita_predial
                ]
            ]
        ];
    }
}
