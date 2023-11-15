<?php

namespace App\Http\Resources\AvaluoPredial;

use App\Http\Resources\Pagination\PaginationResourse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class LcValorTerrenoRuralLocalCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->transform(function ($item) {
            return [
                "zona_economica" => $item->zona_economica,
                "valor_ha" => $item->valor_ha,
                "valor_m2" => $item->valor_m2,
                "vigencia" => $item->vigencia,
            ];
        });
    }
}
