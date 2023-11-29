<?php

namespace App\Http\Controllers\Interesado;

use App\Http\Controllers\AppBaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Interesado\StoreColMiembrosFormRequest;
use App\Http\Resources\Interesado\InteresadoResource;
use App\Models\Local\ColMiembroLocal;
use App\Models\Local\LcAgrupacionInteresadosLocal;
use App\Models\Local\LcInteresadoLocal;
use Illuminate\Http\Request;

class StoreColMiembrosLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreColMiembrosFormRequest $request)
    {
        try {
            $query = ColMiembroLocal::create($request->validated());
            $miembro = new InteresadoResource($query);
            return $this->sendResponse($miembro, "col miembros creado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
