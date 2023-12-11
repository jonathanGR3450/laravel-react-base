<?php

namespace App\Http\Controllers\Predio;

use App\Http\Controllers\AppBaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\PrediosByNumeroPredialFormRequest;
use App\Http\Resources\Predio\NumerosPredialesCollection;
use App\Models\Local\LcNumerosPredialLocal;
use App\Models\Local\LcPredioLocal;
use App\Traits\PaginationTrait;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class GetPrediosByNumeroPredialLocalController extends AppBaseController
{

    use PaginationTrait;

    /**
     * Handle the incoming request.
     */
    public function __invoke(PrediosByNumeroPredialFormRequest $request, string $numero_predial)
    {
        try {
            $numeroPredial = $numero_predial;
            $numeroPredial = Str::substr($numeroPredial, 0, 17);
            $query = LcNumerosPredialLocal::where(DB::raw("LEFT(numero_predial, 17)"), $numeroPredial);

            /**pagination */
            $sortable = [
                'name'    => 'numero_predial',
            ];
    
            $query = $this->paginationQuery($query, $sortable, $request);
            $numerosPrediales = new NumerosPredialesCollection($query);
            return $this->sendResponse($numerosPrediales, "numeros prediales local get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
