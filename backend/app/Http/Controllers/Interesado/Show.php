<?php

namespace App\Http\Controllers\Interesado;

use App\Http\Controllers\AppBaseController;
use App\Http\Resources\Interesado\InteresadoResource;
use App\Http\Resources\Interesado\ShowInteresadoResource;
use App\Models\ColMiembro;
use App\Models\LcInteresado;
use Exception;

class Show extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(int $nit)
    {
        try {
            $interesado = LcInteresado::where('documento_identidad', $nit)->get()->first();
            if (!$interesado) {
                throw new Exception("El interesado con documento de identidad $nit no existe");
            }

            // if (!$miembro = $interesado->miembro) {
            //     $detalle = new ShowInteresadoResource($interesado);
            //     return $this->sendResponse($detalle, "El interesado con documento de identidad $nit encontrado en la tabla lc_interesado");
            // }

            $detalle = new ShowInteresadoResource($interesado);
                return $this->sendResponse($detalle, "El interesado con documento de identidad $nit encontrado en la tabla lc_interesado");

            // $detalle = new InteresadoResource($miembro);
            // return $this->sendResponse($detalle, "El interesado con documento de identidad $nit encontrado en la tabla col_miembros");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
