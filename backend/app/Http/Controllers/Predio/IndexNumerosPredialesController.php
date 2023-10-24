<?php

namespace App\Http\Controllers\Predio;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\IndexNumeroPredialesRequest;
use App\Http\Resources\Predio\NumerosPredialesLocalCollection;
use App\Models\Local\LcNumerosPredialLocal;
use App\Traits\PaginationTrait;

class IndexNumerosPredialesController extends AppBaseController
{

    use PaginationTrait;

    /**
     * Handle the incoming request.
     */
    public function __invoke(IndexNumeroPredialesRequest $request)
    {
        try {
            $query = LcNumerosPredialLocal::select();

            /**pagination */
            $sortable = [
                'name'    => 'numero_predial',
            ];
    
            $query = $this->paginationQuery($query, $sortable, $request);
            $numerosPrediales = new NumerosPredialesLocalCollection($query);
            return $this->sendResponse($numerosPrediales, "numeros prediales local get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
