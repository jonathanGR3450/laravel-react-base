<?php

namespace App\Http\Controllers\RicTramiteCatastral;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\RicTramiteCatastral\StoreLocalFormRequest;
use App\Http\Resources\RicTramiteCatastral\RicTramiteCatastralResource;
use App\Models\Local\RicTramiteCatastralLocal;

class StoreLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreLocalFormRequest $request)
    {
        try {
            $ricTramiteCatastral = RicTramiteCatastralLocal::create($request->validated());
            
            $ricTramiteCatastral = new RicTramiteCatastralResource($ricTramiteCatastral);
            return $this->sendResponse($ricTramiteCatastral, "lc ric tramite catastral creado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
