<?php

namespace App\Http\Controllers\Predio;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Predio\StoreColUnidadfuenteLocalFormRequest;
use App\Models\Local\ColUnidadfuenteLocal;

class StoreColUnidadfuenteLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreColUnidadfuenteLocalFormRequest $request)
    {
        try {
            $unidadfuente = ColUnidadfuenteLocal::create($request->validated());
            
            return $this->sendResponse($unidadfuente, "col unidad fuente creado correctamente", 201);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
