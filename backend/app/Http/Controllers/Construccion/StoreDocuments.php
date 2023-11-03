<?php

namespace App\Http\Controllers\Construccion;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Construccion\StoreDocumentsFormRequest;
use App\Http\Resources\Construccion\ConstruccionResource;
use App\Models\Local\LcConstruccionLocal;
use App\Models\Local\LcDocumentosConstruccionLocal;

class StoreDocuments extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreDocumentsFormRequest $request)
    {
        try {
            $construccion = LcConstruccionLocal::find($request->construccion);
            $documentos = [];

            foreach ($request->archivos as $archivo) {
                $ruta = $archivo['file']->store('documentos', 'public');
                $url = asset('storage/' . $ruta);
        
                $documento = LcDocumentosConstruccionLocal::create([
                    'construccion' => $construccion->t_id,
                    'nombre' => $archivo['file']->getClientOriginalName(),
                    'ruta' => $ruta,
                    'url' => $url,
                    'tipo_documento' => $archivo['tipo_documento'],
                ]);
                $documentos[] = $documento;

            }
            return $this->sendResponse($documentos, "documentos creados correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
