<?php

namespace App\Http\Controllers\AvaluoPredial;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\AvaluoPredial\ListIncrementosFormRequest;
use App\Http\Resources\AvaluoPredial\IncrementosCollection;
use App\Models\Local\LcIncrementoAvaluoLocal;
use App\Traits\PaginationTrait;

class ListIncrementosController extends AppBaseController
{

    use PaginationTrait;

    /**
     * Handle the incoming request.
     */
    public function __invoke(ListIncrementosFormRequest $request)
    {
        try {
            // filters
            $vigencia = $request->input('vigencia');
            $concepto = $request->input('concepto');

            $query = LcIncrementoAvaluoLocal::query()
            ->when($vigencia, function ($query) use ($vigencia) {
                $query->where('vigencia', $vigencia);
            })->when($concepto, function ($query) use ($concepto) {
                $query->where('concepto', $concepto);
            });

            /**pagination */
            $sortable = [
                'vigencia'    => 'vigencia',
            ];
    
            $query = $this->paginationQuery($query, $sortable, $request);
            $tipoTramite = new IncrementosCollection($query);
            return $this->sendResponse($tipoTramite, "incrementos get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
