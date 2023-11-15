<?php

namespace App\Http\Controllers\Predio;

use App\Http\Controllers\AppBaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Predio\StoreLcPredioFormRequest;
use App\Models\Local\LcPredioLocal;
use Illuminate\Http\Request;

class StoreLcPredio extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreLcPredioFormRequest $request)
    {
        try {
            $predio = LcPredioLocal::create($request->validated());
            
            return $this->sendResponse($predio, "col predio creado correctamente", 201);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
