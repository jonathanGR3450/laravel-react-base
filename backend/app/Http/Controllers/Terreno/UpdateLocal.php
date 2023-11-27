<?php

namespace App\Http\Controllers\Terreno;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Terreno\UpdateLocalFormRequest;
use App\Http\Resources\Terreno\TerrenoResource;
use App\Models\Local\LcTerrenoLocal;

class UpdateLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateLocalFormRequest $request, int $id)
    {
        try {
            $terreno = LcTerrenoLocal::find($id);
            $terreno->avaluo_terreno = $request->input('avaluo_terreno');
            $terreno->save();
            
            $terreno = new TerrenoResource($terreno);
            return $this->sendResponse($terreno, "lc terreno actualizado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
