<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\AppBaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\PrediosByNumeroPredialFormRequest;
use App\Http\Requests\Radicado\ListRadicadosFormRequest;
use App\Http\Requests\Radicado\ListTipoTramiteFormRequest;
use App\Http\Resources\Predio\NumerosPredialesCollection;
use App\Http\Resources\Radicado\RadicadoCollection;
use App\Http\Resources\Radicado\TipoTramiteCollection;
use App\Models\LcPredio;
use App\Models\Local\LcPredioLocal;
use App\Models\Local\RadicadosLocal;
use App\Models\TramiteTipo;
use App\Traits\PaginationTrait;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ListRadicadoController extends AppBaseController
{

    use PaginationTrait;

    /**
     * Handle the incoming request.
     */
    public function __invoke(ListRadicadosFormRequest $request)
    {
        try {
            // filters
            $noRadicado = $request->input('no_radicado');
            $asociado = $request->input('asociado_id');
            $tramite = $request->input('tramite_id');

            $query = RadicadosLocal::query()->when($noRadicado, function ($query) use ($noRadicado) {
                $query->where('no_radicado', $noRadicado);
            })->when($asociado, function ($query) use ($asociado) {
                $query->where('asociado_id', $asociado);
            })->when($tramite, function ($query) use ($tramite) {
                $query->where('tramite_id', $tramite);
            });

            /**pagination */
            $sortable = [
                'no_radicado'    => 'no_radicado',
            ];
    
            $query = $this->paginationQuery($query, $sortable, $request);
            $tipoTramite = new RadicadoCollection($query);
            return $this->sendResponse($tipoTramite, "radicados get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
