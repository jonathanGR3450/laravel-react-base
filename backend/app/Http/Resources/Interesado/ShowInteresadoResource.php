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
class ShowInteresadoResource extends JsonResource
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
                "t_id" => $this->t_id,
                "tipo" => [
                    "t_id" => $this->tipoInteresado->t_id,
                    "dispname" => $this->tipoInteresado->dispname,
                ],
                "tipo_documento" => [
                    "t_id" => $this->documentoTipo->t_id,
                    "dispname" => $this->documentoTipo->dispname,
                ],
                "documento_identidad" => $this->documento_identidad ?? null,
                "primer_nombre" => $this->primer_nombre ?? null,
                "segundo_nombre" => $this->segundo_nombre ?? null,
                "primer_apellido" => $this->primer_apellido ?? null,
                "segundo_apellido" => $this->segundo_apellido ?? null,
                "sexo" => [
                    "t_id" => $this->sexoTipo?->t_id,
                    "dispname" => $this->sexoTipo?->dispname,
                ],
                "grupo_etnico" => [
                    "t_id" => $this->grupoEtnico?->t_id,
                    "dispname" => $this->grupoEtnico?->dispname,
                ],
                "razon_social" => $this->razon_social ?? null,
                "estado_civil" => [
                    "t_id" => $this->estadoCivil?->t_id,
                    "dispname" => $this->estadoCivil?->dispname,
                ],
                "nombre" => $this->nombre ?? null,
                "comienzo_vida_util_version" => $this->comienzo_vida_util_version ?? null,
                "fin_vida_util_version" => $this->fin_vida_util_version ?? null,
                "espacio_de_nombres" => $this->espacio_de_nombres ?? null,
                "local_id" => $this->local_id ?? null,
            ],
        ];
    }
}
