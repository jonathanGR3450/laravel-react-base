<?php

namespace App\Http\Controllers\Interesado;

use App\Http\Controllers\AppBaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Interesado\StoreColMiembrosFormRequest;
use App\Http\Resources\Interesado\InteresadoResource;
use App\Models\Local\ColMiembroLocal;
use App\Models\Local\LcAgrupacionInteresadosLocal;
use App\Models\Local\LcInteresadoLocal;
use Exception;
use Illuminate\Http\Request;

class StoreColMiembrosLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreColMiembrosFormRequest $request)
    {
        try {
            if (!$request->input('interesado_lc_interesado') && !$request->input('interesado_lc_interesado_conservacion')) {
                throw new Exception("interesado_lc_interesado or interesado_lc_interesado_conservacion is required");
            }
            $query = ColMiembroLocal::create($request->validated());
            $miembro = new InteresadoResource($query);
            return $this->sendResponse($miembro, "col miembros creado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
