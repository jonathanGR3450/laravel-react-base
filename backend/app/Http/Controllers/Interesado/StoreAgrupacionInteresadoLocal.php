<?php

namespace App\Http\Controllers\Interesado;

use App\Http\Controllers\AppBaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Interesado\StoreAgrupacionInteresadoFormRequest;
use App\Http\Requests\Interesado\StoreColMiembrosFormRequest;
use App\Http\Resources\Interesado\InteresadoResource;
use App\Http\Resources\Interesado\ShowAgrupacionInteresadoResource;
use App\Models\Local\ColMiembroLocal;
use App\Models\Local\LcAgrupacionInteresadosLocal;
use App\Models\Local\LcInteresadoLocal;
use Illuminate\Http\Request;

class StoreAgrupacionInteresadoLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreAgrupacionInteresadoFormRequest $request)
    {
        try {
            $agrupacion = LcAgrupacionInteresadosLocal::create($request->validated());
    
            $agrupacion = new ShowAgrupacionInteresadoResource($agrupacion);
            return $this->sendResponse($agrupacion, "agrupacion interesados creado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
