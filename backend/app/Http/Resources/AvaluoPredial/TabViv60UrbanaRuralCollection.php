<?php

namespace App\Http\Resources\AvaluoPredial;

use App\Http\Resources\Pagination\PaginationResourse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TabViv60UrbanaRuralCollection extends ResourceCollection
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
                "puntos" => $item->puntos,
                "valor" => $item->valor,
                "vigencia" => $item->vigencia,
                "tipo" => $item->tipo,
            ];
        });
    }
}
