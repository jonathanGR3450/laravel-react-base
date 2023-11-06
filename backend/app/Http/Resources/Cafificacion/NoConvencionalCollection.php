<?php

namespace App\Http\Resources\Cafificacion;

use App\Http\Resources\Pagination\PaginationResourse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * @OA\Schema(
 *      title="NoConvencionalCollection",
 *      description="Colección de recursos No Convencional",
 *       @OA\Property(
 *           property="total",
 *           type="integer",
 *           description="Número total de elementos en la colección",
 *           example=2
 *       ),
 *       @OA\Property(
 *           property="per_page",
 *           type="integer",
 *           description="Número de elementos por página",
 *           example=15
 *       ),
 *       @OA\Property(
 *           property="current_page",
 *           type="integer",
 *           description="Página actual",
 *           example=1
 *       ),
 *       @OA\Property(
 *           property="last_page",
 *           type="integer",
 *           description="Número de la última página",
 *           example=1
 *       ),
 *       @OA\Property(
 *           property="from",
 *           type="integer",
 *           description="Índice del primer elemento en la página actual",
 *           example=1
 *       ),
 *       @OA\Property(
 *           property="to",
 *           type="integer",
 *           description="Índice del último elemento en la página actual",
 *           example=2
 *       ),
 *       @OA\Property(
 *           property="first_page_url",
 *           type="string",
 *           description="URL de la primera página",
 *           example="http://localhost/api/v1/caracteristicasunidadconstruccion/no-convencional?page=1"
 *       ),
 *       @OA\Property(
 *           property="self",
 *           type="string",
 *           description="URL de la página actual",
 *           example="http://localhost/api/v1/caracteristicasunidadconstruccion/no-convencional?page=1"
 *       ),
 *       @OA\Property(
 *           property="last_page_url",
 *           type="string",
 *           description="URL de la última página",
 *           example="http://localhost/api/v1/caracteristicasunidadconstruccion/no-convencional?page=1"
 *       ),
 *       @OA\Property(
 *           property="next_page_url",
 *           type="string",
 *           description="URL de la página siguiente (si existe)",
 *           example=null
 *       ),
 *       @OA\Property(
 *           property="prev_page_url",
 *           type="string",
 *           description="URL de la página anterior (si existe)",
 *           example=null
 *       ),
 *       @OA\Property(
 *           property="path",
 *           type="string",
 *           description="Ruta base de la API",
 *           example="http://localhost/api/v1/caracteristicasunidadconstruccion/no-convencional"
 *       ),
 *      @OA\Property(
 *           property="data",
 *           type="array",
 *           description="Ruta base de la API",
 *           @OA\Items(
 *                @OA\Property(property="identificador", type="string", description="Identificador del objeto."),
 *                @OA\Property(property="tipo_construccion", type="object", description="Tipo de construcción.",
 *                    @OA\Property(property="t_id", type="integer", description="ID del tipo de construcción."),
 *                    @OA\Property(property="dispname", type="string", description="Nombre del tipo de construcción."),
 *                ),
 *                @OA\Property(property="tipo_dominio", type="object", description="Tipo de dominio.",
 *                    @OA\Property(property="t_id", type="integer", description="ID del tipo de dominio."),
 *                    @OA\Property(property="dispname", type="string", description="Nombre del tipo de dominio."),
 *                ),
 *                @OA\Property(property="tipo_unidad_construccion", type="object", description="Tipo de unidad de construcción.",
 *                    @OA\Property(property="t_id", type="integer", description="ID del tipo de unidad de construcción."),
 *                    @OA\Property(property="dispname", type="string", description="Nombre del tipo de unidad de construcción."),
 *                ),
 *                @OA\Property(property="tipo_planta", type="object", description="Tipo de planta.",
 *                    @OA\Property(property="t_id", type="integer", description="ID del tipo de planta."),
 *                    @OA\Property(property="dispname", type="string", description="Nombre del tipo de planta."),
 *                ),
 *                @OA\Property(property="total_plantas", type="integer", description="Total de plantas."),
 *                @OA\Property(property="total_habitaciones", type="integer", description="Total de habitaciones."),
 *                @OA\Property(property="total_banios", type="integer", description="Total de baños."),
 *                @OA\Property(property="total_locales", type="integer", description="Total de locales."),
 *                @OA\Property(property="anio_construccion", type="integer", description="Año de construcción."),
 *                @OA\Property(property="uso", type="object", description="Uso de construcción.",
 *                    @OA\Property(property="t_id", type="integer", description="ID del uso de construcción."),
 *                    @OA\Property(property="dispname", type="string", description="Nombre del uso de construcción."),
 *                ),
 *                @OA\Property(property="avaluo_unidad_construccion", type="number", format="float", description="Avalúo de la unidad de construcción."),
 *                @OA\Property(property="area_construida", type="number", format="float", description="Área construida."),
 *                @OA\Property(property="area_privada_construida", type="number", format="float", description="Área privada construida."),
 *                @OA\Property(property="comienzo_vida_util_version", type="string", format="date-time", description="Fecha de inicio de vida útil de la versión."),
 *                @OA\Property(property="fin_vida_util_version", type="string", format="date-time", description="Fecha de fin de vida útil de la versión."),
 *                @OA\Property(property="espacio_de_nombres", type="string", description="Espacio de nombres."),
 *                @OA\Property(property="local_id", type="string", description="ID local."),
 *                @OA\Property(property="observaciones", type="string", description="Observaciones."),
 *                @OA\Property(property="sync", type="boolean", description="Sincronización."),
 *                @OA\Property(property="calificacionnoconvencional", type="array", description="Calificación no convencional.",
 *                    @OA\Items(
 *                        @OA\Property(property="tipo_anexo", type="object", description="Tipo anexo.",
 *                            @OA\Property(property="t_id", type="integer", description="ID del tipo anexo."),
 *                            @OA\Property(property="dispname", type="string", description="Nombre del tipo anexo."),
 *                        ),
 *                    ),
 *                ),
 *           ),
 *       ),
 * )
 */
class NoConvencionalCollection extends ResourceCollection
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
                "t_id" => $item->t_id,
                "identificador" => $item->identificador,
                "tipo_construccion" => [
                    't_id' => $item->tipoConstruccion->t_id,
                    'dispname' => $item->tipoConstruccion->dispname,
                ],
                "tipo_dominio" => [
                    't_id' => $item->tipoDominio?->t_id,
                    'dispname' => $item->tipoDominio?->dispname,
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
                "calificacionnoconvencional" => $item->calificacionNoConvencional?->transform(function ($item) {
                    return [
                        "tipo_anexo" => [
                            't_id' => $item->tipoAnexo->t_id,
                            'dispname' => $item->tipoAnexo->dispname,
                        ],
                    ];
                }),
            ];
        })
        ]
    );
    }
}
