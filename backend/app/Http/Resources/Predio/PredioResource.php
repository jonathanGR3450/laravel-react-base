<?php

namespace App\Http\Resources\Predio;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *      title="PredioResource",
 *      description="Recursos de predio",
 *      @OA\Property(property="Predio", type="object", description="Datos del predio",
 *          @OA\Property(property="Departamento", type="string", description="Nombre del departamento del predio."),
 *          @OA\Property(property="Municipio", type="string", description="Nombre del municipio del predio."),
 *          @OA\Property(property="Id_Operacion", type="integer", description="ID de operación del predio."),
 *          @OA\Property(property="Tiene_FMI", type="boolean", description="Indica si el predio tiene FMI (Fondo Monetario Internacional)."),
 *          @OA\Property(property="Codigo_ORIP", type="string", description="Código ORIP del predio."),
 *          @OA\Property(property="Matricula_Inmobiliaria", type="string", description="Número de matrícula inmobiliaria del predio."),
 *          @OA\Property(
 *              property="Referencia_Registral_Sistema_Antiguo",
 *              type="object",
 *              description="Referencia registral en el sistema antiguo del predio.",
 *              @OA\Property(property="Tipo_Refencia", type="string", description="Tipo de referencia registral."),
 *              @OA\Property(property="Oficina", type="string", description="Oficina de la referencia registral."),
 *              @OA\Property(property="Libro", type="string", description="Libro de la referencia registral."),
 *              @OA\Property(property="Tomo", type="string", description="Tomo de la referencia registral."),
 *              @OA\Property(property="Pagina", type="string", description="Página de la referencia registral."),
 *              @OA\Property(property="Numero", type="string", description="Número de la referencia registral."),
 *              @OA\Property(property="Dia", type="string", description="Día de la referencia registral."),
 *              @OA\Property(property="Mes", type="string", description="Mes de la referencia registral."),
 *              @OA\Property(property="Anio", type="string", description="Año de la referencia registral."),
 *              @OA\Property(property="Matricula", type="string", description="Matrícula de la referencia registral."),
 *          ),
 *          @OA\Property(property="Numero_Predial", type="string", description="Número predial del predio."),
 *          @OA\Property(property="Numero_Predial_Anterior", type="string", description="Número predial anterior del predio."),
 *          @OA\Property(property="Codigo_Homologado", type="string", description="Código homologado del predio."),
 *          @OA\Property(property="Codigo_Homologado_FMI", type="string", description="Código homologado FMI del predio."),
 *          @OA\Property(property="NUPRE", type="string", description="Número único de predio (NUPRE) del predio."),
 *          @OA\Property(property="Avaluo_Catastral", type="number", format="float", description="Avalúo catastral del predio."),
 *          @OA\Property(property="Valor_Referencia", type="number", format="float", description="Valor de referencia del predio."),
 *          @OA\Property(property="Tipo", type="array", @OA\Items(
 *              @OA\Property(property="t_id", type="integer", description="ID del tipo de predio."),
 *              @OA\Property(property="itfcode", type="string", description="Código ITF del tipo de predio."),
 *              @OA\Property(property="ilicode", type="string", description="Código ILI del tipo de predio."),
 *              @OA\Property(property="dispname", type="string", description="Nombre para mostrar del tipo de predio."),
 *              @OA\Property(property="description", type="string", description="Descripción del tipo de predio."),
 *          )),
 *          @OA\Property(property="Condicion_Predio", type="array", @OA\Items(
 *               @OA\Property(property="t_id", type="integer", description="ID de la condición del predio."),
 *               @OA\Property(property="itfcode", type="string", description="Código ITF de la condición del predio."),
 *               @OA\Property(property="ilicode", type="string", description="Código ILI de la condición del predio."),
 *               @OA\Property(property="dispname", type="string", description="Nombre para mostrar de la condición del predio."),
 *               @OA\Property(property="description", type="string", description="Descripción de la condición del predio."),
 *           )),
 *          @OA\Property(property="Direccion", type="array", @OA\Items(
 *               @OA\Property(property="t_id", type="integer", description="ID de la dirección del predio."),
 *               @OA\Property(property="Tipo_Direccion", type="string", description="Tipo de dirección del predio."),
 *               @OA\Property(property="Es_Direccion_Principal", type="boolean", description="Indica si es la dirección principal del predio."),
 *               @OA\Property(property="Localizacion", type="string", description="Localización de la dirección del predio."),
 *               @OA\Property(property="Codigo_Postal", type="string", description="Código postal de la dirección del predio."),
 *               @OA\Property(property="Clase_Via_Principal", type="string", description="Clase de la vía principal del predio."),
 *               @OA\Property(property="Valor_Via_Principal", type="string", description="Valor de la vía principal del predio."),
 *               @OA\Property(property="Letra_Via_Principal", type="string", description="Letra de la vía principal del predio."),
 *               @OA\Property(property="Numero_Predio", type="string", description="Número del predio."),
 *               @OA\Property(property="Sector_Predio", type="string", description="Sector del predio."),
 *               @OA\Property(property="Complemento", type="string", description="Complemento de la dirección del predio."),
 *               @OA\Property(property="Nombre_Predio", type="string", description="Nombre del predio."),
 *           )),
 *          @OA\Property(property="Destinacion_Economica", type="array", @OA\Items(
 *               @OA\Property(property="t_id", type="integer", description="ID de la destinación económica del predio."),
 *               @OA\Property(property="itfcode", type="string", description="Código ITF de la destinación económica del predio."),
 *               @OA\Property(property="ilicode", type="string", description="Código ILI de la destinación económica del predio."),
 *               @OA\Property(property="dispname", type="string", description="Nombre para mostrar de la destinación económica del predio."),
 *               @OA\Property(property="description", type="string", description="Descripción de la destinación económica del predio."),
 *           )),
 *           @OA\Property(property="Clase_Suelo", type="array", @OA\Items(
 *               @OA\Property(property="t_id", type="integer", description="ID de la clase de suelo del predio."),
 *               @OA\Property(property="itfcode", type="string", description="Código ITF de la clase de suelo del predio."),
 *               @OA\Property(property="ilicode", type="string", description="Código ILI de la clase de suelo del predio."),
 *               @OA\Property(property="dispname", type="string", description="Nombre para mostrar de la clase de suelo del predio."),
 *               @OA\Property(property="description", type="string", description="Descripción de la clase de suelo del predio."),
 *           )),
 *           @OA\Property(property="Categoria_Suelo", type="array", @OA\Items(
 *               @OA\Property(property="t_id", type="integer", description="ID de la categoría de suelo del predio."),
 *               @OA\Property(property="itfcode", type="string", description="Código ITF de la categoría de suelo del predio."),
 *               @OA\Property(property="ilicode", type="string", description="Código ILI de la categoría de suelo del predio."),
 *               @OA\Property(property="dispname", type="string", description="Nombre para mostrar de la categoría de suelo del predio."),
 *               @OA\Property(property="description", type="string", description="Descripción de la categoría de suelo del predio."),
 *           )),
 *      ),
 *      @OA\Property(property="Datos_Adicionales_Levantamiento_Catastral", type="object", description="Datos adicionales del predio",
 *          @OA\Property(property="Tiene_Area_Registral", type="boolean", description="Indica si el predio tiene un área registral."),
 *          @OA\Property(property="Area_Registral_M2", type="number", format="float", description="Área registral en metros cuadrados del predio."),
 *          @OA\Property(property="Procedimiento_Catastral_Registral", type="array", @OA\Items(
 *              @OA\Property(property="t_id", type="integer", description="ID del procedimiento catastral registral del predio."),
 *              @OA\Property(property="itfcode", type="string", description="Código ITF del procedimiento catastral registral del predio."),
 *              @OA\Property(property="ilicode", type="string", description="Código ILI del procedimiento catastral registral del predio."),
 *              @OA\Property(property="dispname", type="string", description="Nombre para mostrar del procedimiento catastral registral del predio."),
 *              @OA\Property(property="description", type="string", description="Descripción del procedimiento catastral registral del predio."),
 *          )),
 *          @OA\Property(property="Novedad_Numeros_Prediales", type="array", @OA\Items(
 *              @OA\Property(property="t_id", type="integer", description="ID de la novedad de números prediales del predio."),
 *              @OA\Property(property="t_seq", type="integer", description="ID de secuencia de la novedad de números prediales del predio."),
 *              @OA\Property(property="numero_predial", type="string", description="Número predial de la novedad."),
 *              @OA\Property(property="tipo_novedad", type="string", description="Tipo de novedad de números prediales del predio."),
 *          )),
 *          @OA\Property(property="Novedad_FMI", type="array", @OA\Items(
 *              @OA\Property(property="t_id", type="integer", description="ID de la novedad FMI del predio."),
 *              @OA\Property(property="t_seq", type="integer", description="ID de secuencia de la novedad FMI del predio."),
 *              @OA\Property(property="codigo_orip", type="string", description="Código ORIP de la novedad FMI."),
 *              @OA\Property(property="numero_fmi", type="string", description="Número FMI de la novedad."),
 *          )),
 *          @OA\Property(property="Observaciones", type="string", description="Observaciones del levantamiento catastral del predio."),
 *          @OA\Property(property="Fecha_Visita_predial", type="string", format="date", description="Fecha de visita predial del levantamiento catastral del predio."),
 *      ),
 *      
 * )
 */
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
                    "t_id" => $this->t_id,
                    "coeficiente" => $this->unidadPredialCopropiedad?->coeficiente,
                    "Departamento" => $this->departamento,
                    "Municipio" => $this->municipio,
                    "Id_Operacion" => $this->id_Operacion,
                    "Tiene_FMI" => $this->tiene_fmi,
                    "Codigo_ORIP" => $this->codigo_orip,
                    "Matricula_Inmobiliaria" => $this->matricula_inmobiliaria,
                    "Referencia_Registral_Sistema_Antiguo" => [
                        "t_id" => $this->referenciasSistemaAntiguo?->t_id,
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
                    "t_id" => $this->datosAdicionalesLevantamientoCatastral?->t_id,
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
