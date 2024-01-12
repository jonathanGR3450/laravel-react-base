<?php

namespace App\Http\Controllers\TramiteRadicado;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\TramiteRadicado\UpdateTramiteRadicadoFormRequest;
use App\Models\Local\TramiteRadicadoLocal;
use Exception;

class UpdateLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateTramiteRadicadoFormRequest $request, int $id)
    {
        try {
            $tramiteRadicado = TramiteRadicadoLocal::find($id);
            if (!$tramiteRadicado) {
                throw new Exception("Tramite not found");
            }
            $tramiteRadicado->estado = $request->input('estado');
            $tramiteRadicado->observaciones = $request->input('observaciones');
            $tramiteRadicado->save();

            return $this->sendResponse($tramiteRadicado, "tramite radicado actualizado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
