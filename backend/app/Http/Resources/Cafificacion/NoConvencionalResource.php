<?php

namespace App\Http\Resources\Cafificacion;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *      title="NoConvencionalResource",
 *      description="recurso Contruccion No Convencional",
 *      @OA\Property(property="identificador", type="string", description="Identificador del objeto."),
 *      @OA\Property(property="tipo_construccion", type="object", description="Tipo de construcción.",
 *          @OA\Property(property="t_id", type="integer", description="ID del tipo de construcción."),
 *          @OA\Property(property="dispname", type="string", description="Nombre del tipo de construcción."),
 *      ),
 *      @OA\Property(property="tipo_dominio", type="object", description="Tipo de dominio.",
 *          @OA\Property(property="t_id", type="integer", description="ID del tipo de dominio."),
 *          @OA\Property(property="dispname", type="string", description="Nombre del tipo de dominio."),
 *      ),
 *      @OA\Property(property="tipo_unidad_construccion", type="object", description="Tipo de unidad de construcción.",
 *          @OA\Property(property="t_id", type="integer", description="ID del tipo de unidad de construcción."),
 *          @OA\Property(property="dispname", type="string", description="Nombre del tipo de unidad de construcción."),
 *      ),
 *      @OA\Property(property="tipo_planta", type="object", description="Tipo de planta.",
 *          @OA\Property(property="t_id", type="integer", description="ID del tipo de planta."),
 *          @OA\Property(property="dispname", type="string", description="Nombre del tipo de planta."),
 *      ),
 *      @OA\Property(property="total_plantas", type="integer", description="Total de plantas."),
 *      @OA\Property(property="total_habitaciones", type="integer", description="Total de habitaciones."),
 *      @OA\Property(property="total_banios", type="integer", description="Total de baños."),
 *      @OA\Property(property="total_locales", type="integer", description="Total de locales."),
 *      @OA\Property(property="anio_construccion", type="integer", description="Año de construcción."),
 *      @OA\Property(property="uso", type="object", description="Uso de construcción.",
 *          @OA\Property(property="t_id", type="integer", description="ID del uso de construcción."),
 *          @OA\Property(property="dispname", type="string", description="Nombre del uso de construcción."),
 *      ),
 *      @OA\Property(property="avaluo_unidad_construccion", type="number", format="float", description="Avalúo de la unidad de construcción."),
 *      @OA\Property(property="area_construida", type="number", format="float", description="Área construida."),
 *      @OA\Property(property="area_privada_construida", type="number", format="float", description="Área privada construida."),
 *      @OA\Property(property="comienzo_vida_util_version", type="string", format="date-time", description="Fecha de inicio de vida útil de la versión."),
 *      @OA\Property(property="fin_vida_util_version", type="string", format="date-time", description="Fecha de fin de vida útil de la versión."),
 *      @OA\Property(property="espacio_de_nombres", type="string", description="Espacio de nombres."),
 *      @OA\Property(property="local_id", type="string", description="ID local."),
 *      @OA\Property(property="observaciones", type="string", description="Observaciones."),
 *      @OA\Property(property="sync", type="boolean", description="Sincronización."),
 *      @OA\Property(property="calificacionnoconvencional", type="array", description="Calificación no convencional.",
 *          @OA\Items(
 *              @OA\Property(property="tipo_anexo", type="object", description="Tipo anexo.",
 *                  @OA\Property(property="t_id", type="integer", description="ID del tipo anexo."),
 *                  @OA\Property(property="dispname", type="string", description="Nombre del tipo anexo."),
 *              ),
 *          ),
 *      ),
 * )
 */
class NoConvencionalResource extends JsonResource
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
            "calificacionnoconvencional" => $this->calificacionNoConvencional?->transform(function ($item) {
                return [
                    "tipo_anexo" => [
                        't_id' => $item->tipoAnexo->t_id,
                        'dispname' => $item->tipoAnexo->dispname,
                    ],
                ];
            }),
        ];
    }
}