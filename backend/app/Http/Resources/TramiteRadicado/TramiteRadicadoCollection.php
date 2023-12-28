<?php

namespace App\Http\Resources\TramiteRadicado;

use App\Http\Resources\Pagination\PaginationResourse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TramiteRadicadoCollection extends ResourceCollection
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
                    'radicado' => $item->radicado,
                    'id' => $item->id,
                    'tipo_tramite' => $item->tipo_tramite,
                    'fecha_radicado' => $item->fecha_radicado,
                    'tipo_predio' => $item->tipo_predio,
                    'numero_predial' => $item->numero_predial,
                    'estado' => $item->estado,
                    'fecha_notificacion' => $item->fecha_notificacion,
                    'metodo_notificacion' => $item->metodo_notificacion,
                    'observaciones' => $item->observaciones,
                ];
            })
        ]);
    }
}
