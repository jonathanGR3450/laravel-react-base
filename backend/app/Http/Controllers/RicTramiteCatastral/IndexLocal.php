<?php

namespace App\Http\Controllers\RicTramiteCatastral;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\RicTramiteCatastral\IndexLocalFormRequest;
use App\Http\Resources\RicTramiteCatastral\IncrementosCollection;
use App\Http\Resources\RicTramiteCatastral\RicTramiteCatastralCollection;
use App\Models\Local\LcIncrementoAvaluoLocal;
use App\Models\Local\RicTramiteCatastralLocal;
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
            $mutacion = $request->input('clasificacion_mutacion');
            $numeroResolucion = $request->input('numero_resolucion');

            $query = RicTramiteCatastralLocal::query()
            ->when($mutacion, function ($query) use ($mutacion) {
                $query->where('numero_resolucion', $mutacion);
            })->when($numeroResolucion, function ($query) use ($numeroResolucion) {
                $query->where('clasificacion_mutacion', $numeroResolucion);
            });

            /**pagination */
            $sortable = [
                'clasificacion_mutacion'    => 'clasificacion_mutacion',
            ];
    
            $query = $this->paginationQuery($query, $sortable, $request);
            $tipoTramite = new RicTramiteCatastralCollection($query);
            return $this->sendResponse($tipoTramite, "ric tramite get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
