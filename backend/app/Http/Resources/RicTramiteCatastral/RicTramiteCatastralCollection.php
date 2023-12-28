<?php

namespace App\Http\Resources\RicTramiteCatastral;

use App\Http\Resources\Pagination\PaginationResourse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class RicTramiteCatastralCollection extends ResourceCollection
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
                    'clasificacion_mutacion' => $item->clasificacion_mutacion,
                    'numero_resolucion' => $item->numero_resolucion,
                    'fecha_resolucion' => $item->fecha_resolucion,
                    'fecha_radicacion' => $item->fecha_radicacion,
                    'ric_predio' => $item->ric_predio,
                    'predio' => $item->ricPredio,
                ];
            })
        ]);
    }
}
