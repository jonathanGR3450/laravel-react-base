<?php

namespace App\Http\Controllers\UnidadConstruccion;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\UnidadConstruccion\MigrarLocalFormRequest;
use App\Http\Resources\UnidadConstruccion\UnidadConstruccionResource;
use App\Models\LcUnidadconstruccion;
use App\Models\Local\LcUnidadconstruccionLocal;
use Exception;

class MigrarLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(MigrarLocalFormRequest $request)
    {
        try {
            $tidUnidadContruccion = $request->input('t_id_conservacion');
            $unidadContruccion = LcUnidadconstruccionLocal::where('t_id_conservacion', $tidUnidadContruccion)
            ->get()
            ->first();

            $unidadContruccionData = $unidadContruccion->makeHidden([
                't_id',
                't_id_conservacion',
                'comienzo_vida_util_version',
                'lc_caracteristicasunidadconstruccion_conservacion',
                'lc_construccion_conservacion',
            ])->toArray();
            $unidadContruccionData['lc_caracteristicasunidadconstruccion'] = $unidadContruccion->lc_caracteristicasunidadconstruccion_conservacion;
            $unidadContruccionData['lc_construccion'] = $unidadContruccion->lc_construccion_conservacion;

            LcUnidadconstruccion::where('t_id', $tidUnidadContruccion)->update($unidadContruccionData);
            
            $unidadContruccion = new UnidadConstruccionResource($unidadContruccion);
            return $this->sendResponse($unidadContruccion, "lc unidad construccion migrada correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
