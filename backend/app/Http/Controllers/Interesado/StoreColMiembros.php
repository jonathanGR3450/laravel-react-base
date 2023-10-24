<?php

namespace App\Http\Controllers\Interesado;

use App\Http\Controllers\AppBaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Interesado\StoreColMiembrosFormRequest;
use App\Http\Resources\Interesado\InteresadoResource;
use App\Models\Local\ColMiembroLocal;
use App\Models\Local\LcAgrupacionInteresadosLocal;
use App\Models\Local\LcInteresadoLocal;
use Illuminate\Http\Request;

class StoreColMiembros extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreColMiembrosFormRequest $request)
    {
        try {
            $interesado = LcInteresadoLocal::create($request->input('interesado_lc_interesado'));
            $agrupacion = LcAgrupacionInteresadosLocal::create($request->input('interesado_lc_agrupacioninteresados'));
    
            $query = ColMiembroLocal::create([
                'interesado_lc_interesado' => $interesado->t_id,
                'interesado_lc_agrupacioninteresados' => $agrupacion->t_id,
                'agrupacion' => $agrupacion->t_id,
                'participacion' => $request->input('participacion'),
            ]);
            $query->refresh();
            // dd($query->agrupacionInteresados);
            $miembro = new InteresadoResource($query);
            return $this->sendResponse($miembro, "col miembros creado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
