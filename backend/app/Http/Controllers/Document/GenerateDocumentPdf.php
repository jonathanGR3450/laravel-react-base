<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\AppBaseController;
use App\Services\Document;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;

class GenerateDocumentPdf extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        try {
            $path = "templates";
            $nameTemplate = "template.docx";
            $data = [
                'variable1' => 'Valor 1',
                'variable2' => 'Valor 2',
            ];
            $document = new Document($path, $nameTemplate, $data);
    
            $document->generateNameFileOutput();
            $pathTemplate = $document->generateWordDocument();
            $pathOutputPdf = $document->convertToPdf($pathTemplate);

            return Response::download($pathOutputPdf, "{$document->getNameFileOutput()}.pdf");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
