<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\AppBaseController;
use App\Models\Local\RadicadosLocal;
use App\Services\Document;
use Illuminate\Http\Request;

class GenerateDocumentPdf extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        try {
            $path = "templates";
            $pathOutput = "documents";
            $nameTemplate = "template.docx";
            $data = $request->all();
            
            $document = new Document($path, $nameTemplate, $data, $pathOutput);
    
            $document->generateNameFileOutput();
            $pathTemplate = $document->generateWordDocument();
            $pathOutputPdf = $document->convertToPdf($pathTemplate);

            $urlNameFile = "{$document->getPathOutput()}/{$document->getNameFileOutput()}.pdf";
            $url = asset("storage/$urlNameFile");

            $radicado = RadicadosLocal::create([
                "url" => $url,
                "no_radicado" => $request->input('no_radicado'),
                "tramite_id" => $request->input('tramite_id'),
            ]);

            // return Response::download($pathOutputPdf, "{$document->getNameFileOutput()}.pdf");

            return $this->sendResponse(["url" => $url, "radicado" => $radicado], 'documento generado correctamente');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
