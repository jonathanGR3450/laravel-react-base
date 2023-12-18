<?php

namespace App\Http\Controllers\RicPredioTramiteCatastral;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\RicPredioTramiteCatastral\StoreLocalFormRequest;
use App\Http\Resources\RicPredioTramiteCatastral\RicPredioTramiteCatastralResource;
use App\Models\Local\RicPredioTramiteCatastralLocal;

class StoreLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreLocalFormRequest $request)
    {
        try {
            $ricPredioTramiteCatastral = RicPredioTramiteCatastralLocal::create($request->validated());
            
            $ricPredioTramiteCatastral = new RicPredioTramiteCatastralResource($ricPredioTramiteCatastral);
            return $this->sendResponse($ricPredioTramiteCatastral, "lc ric tramite catastral creado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
