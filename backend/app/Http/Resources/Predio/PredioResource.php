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
        $terreno = $this->uebaunit()->get()->first()?->terreno;
        $uebaunit =  clone $this->uebaunit;
        // dd($terreno->dimension);
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
                    "derechos" => $this->lcDerechos->transform(function ($item) {
                        return [
                            't_id' => $item->t_id,
                            'tipo' => $item->tipo,
                            'fraccion_derecho' => $item->fraccion_derecho,
                            'fecha_inicio_tenencia' => $item->fecha_inicio_tenencia,
                            'descripcion' => $item->descripcion,
                            "fuenteadministrativa" => $item->colRrrFuente->transform(function ($item) {
                                return [
                                    't_id' => $item->fuenteAdministrativa?->t_id,
                                    'tipo' => $item->fuenteAdministrativa?->tipo,
                                    'ente_emisor' => $item->fuenteAdministrativa?->ente_emisor,
                                    'observacion' => $item->fuenteAdministrativa?->observacion,
                                    'numero_fuente' => $item->fuenteAdministrativa?->numero_fuente,
                                    'estado_disponibilidad' => $item->fuenteAdministrativa?->estado_disponibilidad,
                                    'tipo_principal' => $item->fuenteAdministrativa?->tipo_principal,
                                    'fecha_documento_fuente' => $item->fuenteAdministrativa?->fecha_documento_fuente,
                                    'espacio_de_nombres' => $item->fuenteAdministrativa?->espacio_de_nombres,
                                ];
                            }),
                            'interesado_lc_interesado' => [
                                "t_id" => $item->interesado?->t_id ?? null,
                                "tipo" => $item->interesado?->tipo ?? null,
                                "tipo_documento" => $item->interesado?->tipo_documento ?? null,
                                "documento_identidad" => $item->interesado?->documento_identidad ?? null,
                                "primer_nombre" => $item->interesado?->primer_nombre ?? null,
                                "segundo_nombre" => $item->interesado?->segundo_nombre ?? null,
                                "primer_apellido" => $item->interesado?->primer_apellido ?? null,
                                "segundo_apellido" => $item->interesado?->segundo_apellido ?? null,
                                "sexo" => $item->interesado?->sexo ?? null,
                                "grupo_etnico" => $item->interesado?->grupo_etnico ?? null,
                                "razon_social" => $item->interesado?->razon_social ?? null,
                                "estado_civil" => $item->interesado?->estado_civil ?? null,
                                "nombre" => $item->interesado?->nombre ?? null,
                                "comienzo_vida_util_version" => $item->interesado?->comienzo_vida_util_version ?? null,
                                "fin_vida_util_version" => $item->interesado?->fin_vida_util_version ?? null,
                                "espacio_de_nombres" => $item->interesado?->espacio_de_nombres ?? null,
                                "local_id" => $item->interesado?->local_id ?? null,
                            ],
                            "interesado_lc_agrupacioninteresados" => [
                                "t_id" => $item->lcAgrupacionInteresados?->t_id ?? null,
                                "tipo" => $item->lcAgrupacionInteresados?->tipo ?? null,
                                "nombre" => $item->lcAgrupacionInteresados?->nombre ?? null,
                                "comienzo_vida_util_version" => $item->lcAgrupacionInteresados?->comienzo_vida_util_version ?? null,
                                "fin_vida_util_version" => $item->lcAgrupacionInteresados?->fin_vida_util_version ?? null,
                                "espacio_de_nombres" => $item->lcAgrupacionInteresados?->espacio_de_nombres ?? null,
                                "local_id" => $item->lcAgrupacionInteresados?->local_id ?? null,
                            ],
                            'unidad' => $item->unidad,
                            'comienzo_vida_util_version' => $item->comienzo_vida_util_version,
                            'fin_vida_util_version' => $item->fin_vida_util_version,
                            'espacio_de_nombres' => $item->espacio_de_nombres,
                        ];
                    }),

                    "construccion" => $this->uebaunit->transform(function ($item) {
                        return [
                            't_id' => $item?->construccion?->t_id,
                            'identificador' => $item?->construccion?->identificador,
                            'tipo_construccion' => [
                                't_id' => $item?->construccion?->tipoConstruccion?->t_id,
                                'dispname' => $item?->construccion?->tipoConstruccion?->dispname
                            ],
                            'tipo_dominio' => [
                                't_id' => $item?->construccion?->tipoDominio?->t_id,
                                'dispname' => $item?->construccion?->tipoDominio?->dispname
                            ],
                            'numero_pisos' => $item?->construccion?->numero_pisos,
                            'numero_sotanos' => $item?->construccion?->numero_sotanos,
                            'numero_mezanines' => $item?->construccion?->numero_mezanines,
                            'numero_semisotanos' => $item?->construccion?->numero_semisotanos,
                            'anio_construccion' => $item?->construccion?->anio_construccion,
                            'avaluo_construccion' => $item?->construccion?->avaluo_construccion,
                            'valor_referencia_construccion' => $item?->construccion?->valor_referencia_construccion,
                            'area_construccion' => $item?->construccion?->area_construccion,
                            'altura' => $item?->construccion?->altura,
                            'observaciones' => $item?->construccion?->observaciones,
                            'dimension' => [
                                't_id' => $item?->construccion?->lcdimension?->t_id,
                                'dispname' => $item?->construccion?->lcdimension?->dispname
                            ],
                            'etiqueta' => $item?->construccion?->etiqueta,
                            'relacion_superficie' => [
                                't_id' => $item?->construccion?->relacionSuperficie?->t_id,
                                'dispname' => $item?->construccion?->relacionSuperficie?->dispname
                            ],
                            'nivel' => [
                                't_id' => $item?->construccion?->lcnivel?->t_id,
                                'dispname' => $item?->construccion?->lcnivel?->dispname
                            ],
                            'comienzo_vida_util_version' => $item?->construccion?->comienzo_vida_util_version,
                            'fin_vida_util_version' => $item?->construccion?->fin_vida_util_version,
                            'espacio_de_nombres' => $item?->construccion?->espacio_de_nombres,
                        ];
                    }),
                    "unidad_construccion" => $uebaunit->transform(function ($item) {
                        return [
                            "t_id" => $item?->unidadConstruccion?->t_id,
                            "area_construida" => $item?->unidadConstruccion?->area_construida,
                            "lc_caracteristicasunidadconstruccion" => [
                                "tipo_construccion" => [
                                    "t_id" => $item?->unidadConstruccion?->caracteristicasunidadconstruccion?->tipoConstruccion->t_id,
                                    "dispname" => $item?->unidadConstruccion?->caracteristicasunidadconstruccion?->tipoConstruccion->dispname,
                                ],
                                "tipo_unidad_construccion" => [
                                    "t_id" => $item?->unidadConstruccion?->caracteristicasunidadconstruccion?->tipoUnidadConstruccion->t_id,
                                    "dispname" => $item?->unidadConstruccion?->caracteristicasunidadconstruccion?->tipoUnidadConstruccion->dispname,
                                ],
                                "uso" => [
                                    "t_id" => $item?->unidadConstruccion?->caracteristicasunidadconstruccion?->usoConstruccion->t_id,
                                    "dispname" => $item?->unidadConstruccion?->caracteristicasunidadconstruccion?->usoConstruccion->dispname,
                                ],
                                "calificacionconvencional" => [
                                    "t_id" => $item?->unidadConstruccion?->caracteristicasunidadconstruccion?->calificacionConvencional()->get()->first()?->t_id,
                                    "total_calificacion" => $item?->unidadConstruccion?->caracteristicasunidadconstruccion?->calificacionConvencional()->get()->first()?->total_calificacion,
                                ],
                                "calificacionnoconvencional" => [
                                    "tipo_anexo" => [
                                        "t_id" => $item?->unidadConstruccion?->caracteristicasunidadconstruccion?->calificacionNoConvencional()->get()->first()?->tipo_anexo->t_id,
                                        "dispname" => $item?->unidadConstruccion?->caracteristicasunidadconstruccion?->calificacionNoConvencional()->get()->first()?->tipo_anexo->dispname,
                                    ],
                                ],
                            ]
                        ];
                    }),
                    "terreno" => [
                        't_id' => $terreno?->t_id,
                        'area_terreno' => $terreno?->area_terreno,
                        'avaluo_terreno' => $terreno?->avaluo_terreno,
                        'manzana_vereda_codigo' => $terreno?->manzana_vereda_codigo,
                        'dimension' => [
                            't_id' => $terreno?->lcdimension?->t_id,
                            'dispname' => $terreno?->lcdimension?->dispname
                        ],
                        'etiqueta' => $terreno?->etiqueta,
                        'relacion_superficie' =>  [
                            't_id' => $terreno?->relacionSuperficie?->t_id,
                            'dispname' => $terreno?->relacionSuperficie?->dispname
                        ],
                        'nivel' => [
                            't_id' => $terreno?->lcnivel?->t_id,
                            'dispname' => $terreno?->lcnivel?->dispname
                        ],
                        'comienzo_vida_util_version' => $terreno?->comienzo_vida_util_version,
                        'fin_vida_util_version' => $terreno?->fin_vida_util_version,
                        'espacio_de_nombres' => $terreno?->espacio_de_nombres,
                    ],
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
