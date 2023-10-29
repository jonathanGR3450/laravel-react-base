<?php

namespace App\Http\Controllers\FuenteAdministrativa;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\FuenteAdministrativa\StoreLocalFormRequest;
use App\Http\Resources\FuenteAdministrativa\FuenteAdministrativaResource;
use App\Models\Local\LcFuenteadministrativaLocal;

class StoreLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreLocalFormRequest $request)
    {
        try {
            $fuenteAdministrativa = LcFuenteadministrativaLocal::create($request->validated());
            
            $fuenteAdministrativa = new FuenteAdministrativaResource($fuenteAdministrativa);
            return $this->sendResponse($fuenteAdministrativa, "lc fuente administrativa creada correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
