<?php

namespace App\Http\Controllers\Interesado;

use App\Http\Controllers\AppBaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Interesado\StoreInteresadoFormRequest;
use App\Http\Resources\Interesado\InteresadoResource;
use App\Http\Resources\Interesado\ShowInteresadoResource;
use App\Models\Local\ColMiembroLocal;
use App\Models\Local\LcAgrupacionInteresadosLocal;
use App\Models\Local\LcInteresadoLocal;
use Illuminate\Http\Request;

class StoreInteresadoLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreInteresadoFormRequest $request)
    {
        try {
            $interesado = LcInteresadoLocal::create($request->validated());
            $interesado = new ShowInteresadoResource($interesado);
            return $this->sendResponse($interesado, "interesado creado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
