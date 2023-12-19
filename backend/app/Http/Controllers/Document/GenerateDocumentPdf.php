<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Radicado\StoreRadicadoFormRequest;
use App\Models\Local\RadicadosLocal;
use App\Models\TramiteTipo;
use App\Services\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class GenerateDocumentPdf extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreRadicadoFormRequest $request)
    {
        try {
            $tramiteTipo = TramiteTipo::find($request->tramite_id);

            $path = "templates";
            $pathOutput = "documents";
            $nameTemplate = "{$tramiteTipo->descripcion}.docx";

            $data = $request->all();
            
            $document = new Document($path, $nameTemplate, $data, $pathOutput);
    
            $document->generateNameFileOutput();
            $pathTemplate = $document->generateWordDocument();
            // $pathOutputPdf = $document->convertToPdf($pathTemplate);

            $urlNameFile = "{$document->getPathOutput()}/{$document->getNameFileOutput()}.docx";
            $url = asset("storage/$urlNameFile");

            $radicado = RadicadosLocal::create([
                "url" => $url,
                "no_radicado" => $request->input('no_radicado'),
                "asociado_id" => $request->input('asociado_id'),
                "tramite_id" => $request->input('tramite_id'),
            ]);

            return Response::download($pathTemplate, "{$document->getNameFileOutput()}.docx");
            // return $this->sendResponse(["url" => $url, "radicado" => $radicado], 'documento generado correctamente');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
