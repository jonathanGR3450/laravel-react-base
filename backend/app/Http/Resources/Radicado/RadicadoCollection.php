<?php

namespace App\Http\Resources\Radicado;

use App\Http\Resources\Pagination\PaginationResourse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class RadicadoCollection extends ResourceCollection
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
                    "t_id" => $item->t_id,
                    "url" => $item->url,
                    "no_radicado" => $item->no_radicado,
                    "asociado_id" => $item->asociado_id,
                    "tramite_id" => $item->tramite_id,
                    "tramite" => $item->tipoRadicado?->nombre,
                ];
            })
        ]);
    }
}
