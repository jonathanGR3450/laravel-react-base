<?php

namespace App\Http\Controllers\Derecho;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Derecho\MigrateLocalFormRequest;
use App\Models\LcAgrupacionInteresados;
use App\Models\LcConstruccion;
use App\Models\LcDerecho;
use App\Models\LcInteresado;
use App\Models\LcPredio;
use App\Models\Local\LcConstruccionLocal;
use App\Models\Local\LcDerechoLocal;
use Exception;
use Illuminate\Support\Facades\DB;

class MigrateLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(MigrateLocalFormRequest $request)
    {
        try {
            $idDerecho = $request->input('t_id');
            $derecho = LcDerechoLocal::findOrFail($idDerecho);

            $predioConservacion = LcPredio::findOrFail($derecho->unidad_conservacion)->exists();
            if (!$derecho->unidad_conservacion && $predioConservacion) {
                throw new Exception("predio conservacion no encontrado");
            }

            $derechoData = $derecho->makeHidden(['t_id', 'unidad_conservacion', 'interesado_lc_interesado_conservacion', 'interesado_lc_agrupacioninteresados_conservacion'])->toArray();
            $derechoData['unidad'] = $derecho->unidad_conservacion;

            if ($derecho->interesado_lc_interesado_conservacion) {
                $derechoData['interesado_lc_interesado'] = $derecho->interesado_lc_interesado_conservacion;
            } else if ($derecho->interesado_lc_interesado) {
                // crear el interesado
                $interesado = $derecho->interesado;
                $interesadoData = $interesado->makeHidden(['t_id'])->toArray();
                $lcInteresado = LcInteresado::create($interesadoData);
                $derechoData['interesado_lc_interesado'] = $lcInteresado->t_id;
            }

            if ($derecho->interesado_lc_agrupacioninteresados_conservacion) {
                $derechoData['interesado_lc_agrupacioninteresados'] = $derecho->interesado_lc_agrupacioninteresados_conservacion;
            } else if ($derecho->interesado_lc_agrupacioninteresados) {
                // crear el agrupacionInteresados
                $agrupacionInteresados = $derecho->agrupacionInteresados;
                $agrupacionInteresadosData = $agrupacionInteresados->makeHidden(['t_id'])->toArray();
                $lcAgrupacionInteresados = LcAgrupacionInteresados::create($agrupacionInteresadosData);
                $derechoData['interesado_lc_agrupacioninteresados'] = $lcAgrupacionInteresados->t_id;
            }
            $derechoData['comienzo_vida_util_version'] = date('Y-m-d H:i:s');
            // dd($derechoData);
            $lcDerecho = LcDerecho::create($derechoData);
            
            return $this->sendResponse($derecho, "lc derecho migrado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
