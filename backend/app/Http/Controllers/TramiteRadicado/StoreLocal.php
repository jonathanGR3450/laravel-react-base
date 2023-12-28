<?php

namespace App\Http\Controllers\TramiteRadicado;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\TramiteRadicado\StoreTramiteRadicadoFormRequest;
use App\Models\Local\TramiteRadicadoLocal;

class StoreLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreTramiteRadicadoFormRequest $request)
    {
        try {
            $tramiteRadicado = TramiteRadicadoLocal::create($request->validated());
            return $this->sendResponse($tramiteRadicado, "tramite radicado creado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
