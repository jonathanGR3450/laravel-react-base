<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\AppBaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\PrediosByNumeroPredialFormRequest;
use App\Http\Requests\Radicado\ListTipoTramiteFormRequest;
use App\Http\Resources\Predio\NumerosPredialesCollection;
use App\Http\Resources\Radicado\TipoTramiteCollection;
use App\Models\LcPredio;
use App\Models\Local\LcPredioLocal;
use App\Models\TramiteTipo;
use App\Traits\PaginationTrait;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ListTipoTramiteController extends AppBaseController
{

    use PaginationTrait;

    /**
     * Handle the incoming request.
     */
    public function __invoke(ListTipoTramiteFormRequest $request)
    {
        try {

            $query = TramiteTipo::query();

            /**pagination */
            $sortable = [
                'name'    => 'nombre',
            ];
            $request['sort'] = 'id';
    
            $query = $this->paginationQuery($query, $sortable, $request);
            $tipoTramite = new TipoTramiteCollection($query);
            return $this->sendResponse($tipoTramite, "tipo tramite get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
