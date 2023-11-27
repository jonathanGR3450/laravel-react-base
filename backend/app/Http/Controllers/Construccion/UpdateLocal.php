<?php

namespace App\Http\Controllers\Construccion;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Construccion\UpdateLocalFormRequest;
use App\Http\Resources\Construccion\ConstruccionResource;
use App\Models\Local\LcConstruccionLocal;

class UpdateLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateLocalFormRequest $request, int $id)
    {
        try {
            $construccion = LcConstruccionLocal::find($id);
            $construccion->avaluo_construccion = $request->input('avaluo_construccion');
            $construccion->save();
            
            $construccion = new ConstruccionResource($construccion);
            return $this->sendResponse($construccion, "lc construccion actualizado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
