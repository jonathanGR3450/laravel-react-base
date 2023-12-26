<?php

namespace App\Http\Controllers\TramiteRadicado;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\TramiteRadicado\IndexLocalFormRequest;
use App\Http\Resources\TramiteRadicado\TramiteRadicadoCollection;
use App\Models\Local\TramiteRadicadoLocal;
use App\Traits\PaginationTrait;

class IndexLocal extends AppBaseController
{

    use PaginationTrait;

    /**
     * Handle the incoming request.
     */
    public function __invoke(IndexLocalFormRequest $request)
    {
        try {
            // filters
            $radicado = $request->input('radicado');
            $tipo_tramite = $request->input('tipo_tramite');
            $fecha_radicado = $request->input('fecha_radicado');
            $tipo_predio = $request->input('tipo_predio');
            $numero_predial = $request->input('numero_predial');
            $estado = $request->input('estado');
            $fecha_notificacion = $request->input('fecha_notificacion');
            $metodo_notificacion = $request->input('metodo_notificacion');

            $query = TramiteRadicadoLocal::query()->when($radicado, function ($query) use ($radicado) {
                $query->where('radicado', $radicado);
            })->when($tipo_tramite, function ($query) use ($tipo_tramite) {
                $query->where('tipo_tramite', $tipo_tramite);
            })->when($fecha_radicado, function ($query) use ($fecha_radicado) {
                $query->where('fecha_radicado', $fecha_radicado);
            })->when($tipo_predio, function ($query) use ($tipo_predio) {
                $query->where('tipo_predio', $tipo_predio);
            })->when($numero_predial, function ($query) use ($numero_predial) {
                $query->where('numero_predial', $numero_predial);
            })->when($estado, function ($query) use ($estado) {
                $query->where('estado', $estado);
            })->when($fecha_notificacion, function ($query) use ($fecha_notificacion) {
                $query->where('fecha_notificacion', $fecha_notificacion);
            })->when($metodo_notificacion, function ($query) use ($metodo_notificacion) {
                $query->where('metodo_notificacion', $metodo_notificacion);
            });

            /**pagination */
            $sortable = [
                'radicado'    => 'radicado',
            ];
    
            $query = $this->paginationQuery($query, $sortable, $request);
            $tramiteRadicado = new TramiteRadicadoCollection($query);
            return $this->sendResponse($tramiteRadicado, "tramite radicado get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
