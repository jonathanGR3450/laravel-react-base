<?php

namespace App\Http\Controllers\Predio;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Predio\StoreColUebaunitLocalFormRequest;
use App\Models\Local\ColUebaunitLocal;
use Exception;

class StoreColUebaunitLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreColUebaunitLocalFormRequest $request)
    {
        try {

            if (!$request->input('baunit') && !$request->input('baunit_conservacion')) {
                throw new Exception("baunit or baunit_conservacion is required");
            }

            $uebaunit = ColUebaunitLocal::create($request->validated());
            
            return $this->sendResponse($uebaunit, "col uebaunit creado correctamente", 201);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
