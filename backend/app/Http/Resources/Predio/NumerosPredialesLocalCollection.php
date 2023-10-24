<?php

namespace App\Http\Resources\Predio;

use App\Http\Resources\Pagination\PaginationResourse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class NumerosPredialesLocalCollection extends ResourceCollection
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
    public function toArray(Request $request): array
    {
        return array_merge($this->pagination->resolve(), [
            "data" => $this->collection->transform(function ($item) {
                return [
                    "numero_predial" => $item->numero_predial,
                    "matricula_inmobiliaria" => $item->matricula_inmobiliaria,
                    "direccion" => [
                        't_seq' => $item->direccion->t_seq,
                        'tipo_direccion' => $item->direccion->tipo_direccion,
                        'es_direccion_principal' => $item->direccion->es_direccion_principal,
                        'codigo_postal' => $item->direccion->codigo_postal,
                        'clase_via_principal' => $item->direccion->clase_via_principal,
                        'valor_via_principal' => $item->direccion->valor_via_principal,
                        'letra_via_principal' => $item->direccion->letra_via_principal,
                        'sector_ciudad' => $item->direccion->sector_ciudad,
                        'valor_via_generadora' => $item->direccion->valor_via_generadora,
                        'letra_via_generadora' => $item->direccion->letra_via_generadora,
                        'numero_predio' => $item->direccion->numero_predio,
                        'sector_predio' => $item->direccion->sector_predio,
                        'complemento' => $item->direccion->complemento,
                        'nombre_predio' => $item->direccion->nombre_predio,
                        'extunidadedificcnfsica_ext_direccion_id' => $item->direccion->extunidadedificcnfsica_ext_direccion_id,
                        'extinteresado_ext_direccion_id' => $item->direccion->extinteresado_ext_direccion_id,
                        'lc_construccion_ext_direccion_id' => $item->direccion->lc_construccion_ext_direccion_id,
                        'lc_nu_spcjrdcrdsrvcios_ext_direccion_id' => $item->direccion->lc_nu_spcjrdcrdsrvcios_ext_direccion_id,
                        'lc_n_spcjrdcndddfccion_ext_direccion_id' => $item->direccion->lc_n_spcjrdcndddfccion_ext_direccion_id,
                        'lc_terreno_ext_direccion_id' => $item->direccion->lc_terreno_ext_direccion_id,
                        'lc_unidadconstruccion_ext_direccion_id' => $item->direccion->lc_unidadconstruccion_ext_direccion_id,
                        'lc_predio_direccion' => $item->direccion->lc_predio_direccion,
                        'lc_servidumbretransito_ext_direccion_id' => $item->direccion->lc_servidumbretransito_ext_direccion_id,
                        'lc_numeros_prediales_id' => $item->direccion->lc_numeros_prediales_id,
                    ],
                    "numero_homologado" => [
                        'numeros_homologados' => $item->numeroHomologado->numeros_homologados,
                        'taken' => $item->numeroHomologado->taken,
                    ],
                    "tomado" => $item->taken,
                ];
            })
        ]);
    }
}
