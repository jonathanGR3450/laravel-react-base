<?php

namespace App\Http\Resources\AvaluoPredial;

use App\Http\Resources\Pagination\PaginationResourse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class IncrementosCollection extends ResourceCollection
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
                    "concepto" => $item->concepto,
                    "incremento" => $item->incremento,
                    "vigencia" => $item->vigencia,
                ];
            })
        ]);
    }
}
