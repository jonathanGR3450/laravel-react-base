<?php

namespace App\Http\Resources\Interesado;

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
class InteresadoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "interesado" => [
                "interesado_lc_interesado" => [
                    "t_id" => $this->interesado?->t_id ?? null,
                    "tipo" => $this->interesado?->tipo ?? null,
                    "tipo_documento" => $this->interesado?->tipo_documento ?? null,
                    "documento_identidad" => $this->interesado?->documento_identidad ?? null,
                    "primer_nombre" => $this->interesado?->primer_nombre ?? null,
                    "segundo_nombre" => $this->interesado?->segundo_nombre ?? null,
                    "primer_apellido" => $this->interesado?->primer_apellido ?? null,
                    "segundo_apellido" => $this->interesado?->segundo_apellido ?? null,
                    "sexo" => $this->interesado?->sexo ?? null,
                    "grupo_etnico" => $this->interesado?->grupo_etnico ?? null,
                    "razon_social" => $this->interesado?->razon_social ?? null,
                    "estado_civil" => $this->interesado?->estado_civil ?? null,
                    "nombre" => $this->interesado?->nombre ?? null,
                    "comienzo_vida_util_version" => $this->interesado?->comienzo_vida_util_version ?? null,
                    "fin_vida_util_version" => $this->interesado?->fin_vida_util_version ?? null,
                    "espacio_de_nombres" => $this->interesado?->espacio_de_nombres ?? null,
                    "local_id" => $this->interesado?->local_id ?? null,
                ],
                "interesado_lc_interesado_conservacion" => [
                    "t_id" => $this->interesadoConservacion?->t_id ?? null,
                    "tipo" => $this->interesadoConservacion?->tipo ?? null,
                    "tipo_documento" => $this->interesadoConservacion?->tipo_documento ?? null,
                    "documento_identidad" => $this->interesadoConservacion?->documento_identidad ?? null,
                    "primer_nombre" => $this->interesadoConservacion?->primer_nombre ?? null,
                    "segundo_nombre" => $this->interesadoConservacion?->segundo_nombre ?? null,
                    "primer_apellido" => $this->interesadoConservacion?->primer_apellido ?? null,
                    "segundo_apellido" => $this->interesadoConservacion?->segundo_apellido ?? null,
                    "sexo" => $this->interesadoConservacion?->sexo ?? null,
                    "grupo_etnico" => $this->interesadoConservacion?->grupo_etnico ?? null,
                    "razon_social" => $this->interesadoConservacion?->razon_social ?? null,
                    "estado_civil" => $this->interesadoConservacion?->estado_civil ?? null,
                    "nombre" => $this->interesadoConservacion?->nombre ?? null,
                    "comienzo_vida_util_version" => $this->interesadoConservacion?->comienzo_vida_util_version ?? null,
                    "fin_vida_util_version" => $this->interesadoConservacion?->fin_vida_util_version ?? null,
                    "espacio_de_nombres" => $this->interesadoConservacion?->espacio_de_nombres ?? null,
                    "local_id" => $this->interesadoConservacion?->local_id ?? null,
                ],
                "interesado_lc_agrupacioninteresados" => [
                    "t_id" => $this->agrupacionInteresados?->t_id ?? null,
                    "tipo" => $this->agrupacionInteresados?->tipo ?? null,
                    "nombre" => $this->agrupacionInteresados?->nombre ?? null,
                    "comienzo_vida_util_version" => $this->agrupacionInteresados?->comienzo_vida_util_version ?? null,
                    "fin_vida_util_version" => $this->agrupacionInteresados?->fin_vida_util_version ?? null,
                    "espacio_de_nombres" => $this->agrupacionInteresados?->espacio_de_nombres ?? null,
                    "local_id" => $this->agrupacionInteresados?->local_id ?? null,
                ],
                "agrupacion" => [
                    "t_id" => $this->agrupacionRelacion?->t_id ?? null,
                    "tipo" => $this->agrupacionRelacion?->tipo ?? null,
                    "nombre" => $this->agrupacionRelacion?->nombre ?? null,
                    "comienzo_vida_util_version" => $this->agrupacionRelacion?->comienzo_vida_util_version ?? null,
                    "fin_vida_util_version" => $this->agrupacionRelacion?->fin_vida_util_version ?? null,
                    "espacio_de_nombres" => $this->agrupacionRelacion?->espacio_de_nombres ?? null,
                    "local_id" => $this->agrupacionRelacion?->local_id ?? null,
                ],
                "participacion" => $this->participacion ?? null,
                "t_id" => $this->t_id ?? null,
            ],
        ];
    }
}
