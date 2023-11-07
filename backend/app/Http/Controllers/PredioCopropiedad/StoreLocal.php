<?php

namespace App\Http\Controllers\PredioCopropiedad;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\PredioCopropiedad\StoreLocalFormRequest;
use App\Http\Resources\PredioCopropiedad\PredioCopropiedadResource;
use App\Models\Local\LcPredioCopropiedadLocal;

class StoreLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreLocalFormRequest $request)
    {
        try {
            $copropiedad = LcPredioCopropiedadLocal::create($request->validated());
            
            $copropiedad = new PredioCopropiedadResource($copropiedad);
            return $this->sendResponse($copropiedad, "lc predio copropiedad creado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
