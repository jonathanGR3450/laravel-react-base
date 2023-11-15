<?php

namespace App\Http\Controllers\AvaluoPredial;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\AvaluoPredial\TabAnexosUrbanaRuralLocalFormRequest;
use App\Http\Resources\AvaluoPredial\TabAnexosUrbanaRuralLocalCollection;
use App\Models\Local\TabAnexosUrbanaRuralLocal;

class ListTabAnexosUrbanaRuralLocalController extends AppBaseController
{

    /**
     * Handle the incoming request.
     */
    public function __invoke(TabAnexosUrbanaRuralLocalFormRequest $request)
    {
        try {

            // filters
            $puntos = $request->input('puntos');
            $vigencia = $request->input('vigencia');
            $tipo = $request->input('tipo');
            $destino = $request->input('destino');

            $query = TabAnexosUrbanaRuralLocal::when($puntos, function ($query, $puntos) {
                $query->where('puntos', $puntos);
            })->when($vigencia, function ($query, $vigencia) {
                $query->where('vigencia', $vigencia);
            })->when($tipo, function ($query, $tipo) {
                $query->where('tipo', $tipo);
            })->when($destino, function ($query, $destino) {
                $query->where('destino', $destino);
            })->get();
    
            $valorTerreno = new TabAnexosUrbanaRuralLocalCollection($query);
            return $this->sendResponse($valorTerreno, "valor tab anexos get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
