<?php

namespace App\Http\Controllers\Predio;

use App\Http\Controllers\AppBaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Predio\UpdateLcPredioFormRequest;
use App\Models\Local\LcPredioLocal;
use Illuminate\Http\Request;

class UpdateLcPredio extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateLcPredioFormRequest $request, int $id)
    {
        try {
            $predio = LcPredioLocal::find($id);
            $predio->avaluo_catastral = $request->input('avaluo_catastral');
            $predio->save();
            
            return $this->sendResponse($predio, "col predio actualizado correctamente", 201);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
