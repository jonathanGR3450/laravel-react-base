<?php

namespace App\Services;

use Illuminate\Support\Str;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\Settings;
use PhpOffice\PhpWord\TemplateProcessor;

class Document
{
    private string $path;
    private string $nameFile;
    private array $data;
    private string $nameFileOutput;

    public function __construct(string $path, string $nameFile, array $data) {
        $this->path = $path;
        $this->nameFile = $nameFile;
        $this->data = $data;
    }

    public function generateNameFileOutput(): void {
        $dateNow = date('Y-m-d');
        $uuid = Str::uuid()->toString();
        $nameFileOutput = "$dateNow-$uuid-document";
        $this->nameFileOutput = $nameFileOutput;
    }

    public function getNameFileOutput() : string {
        return $this->nameFileOutput;
    }

    function generateWordDocument(): string {
        $templatePath = public_path("{$this->path}/{$this->nameFile}");

        $templateProcessor = new TemplateProcessor($templatePath);
        $templateProcessor->setValues($this->data);

        $nameFileOutput = "{$this->nameFileOutput}.docx";
        $outputPath = storage_path("app/public/documents/$nameFileOutput");
        $templateProcessor->saveAs($outputPath);

        return $outputPath;
    }

    public function convertToPdf(string $filePath): string {
        $domPdfPath = base_path('vendor/dompdf/dompdf');
        Settings::setPdfRendererPath($domPdfPath);
        Settings::setPdfRendererName('DomPDF'); 
        $Content = IOFactory::load($filePath); 
        $PDFWriter = IOFactory::createWriter($Content,'PDF');

        $nameFileOutput = str_replace('.docx', '.pdf', $filePath);
        $PDFWriter->save($nameFileOutput);
        return $nameFileOutput;
    }
}
