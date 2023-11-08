<?php

namespace App\Http\Controllers\ContactoVisita;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\ContactoVisita\StoreLocalFormRequest;
use App\Http\Resources\ContactoVisita\ContactoVisitaResource;
use App\Models\Local\LcContactoVisitaLocal;

class StoreLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreLocalFormRequest $request)
    {
        try {
            $datosAdicionales = LcContactoVisitaLocal::create($request->validated());
            
            $datosAdicionales = new ContactoVisitaResource($datosAdicionales);
            return $this->sendResponse($datosAdicionales, "lc contacto visita creada correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
