<?php

namespace App\Services;

use Illuminate\Support\Str;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\Settings;
use PhpOffice\PhpWord\TemplateProcessor;

class Document
{
    private string $path;
    private string $pathOutput;
    private string $nameFile;
    private array $data;
    private string $nameFileOutput;

    public function __construct(string $path, string $nameFile, array $data, string $pathOutput) {
        $this->path = $path;
        $this->nameFile = $nameFile;
        $this->data = $data;
        $this->pathOutput = $pathOutput;
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

    public function getPathOutput() : string {
        return $this->pathOutput;
    }

    function generateWordDocument(): string {
        $templatePath = public_path("{$this->path}/{$this->nameFile}");

        $templateProcessor = new TemplateProcessor($templatePath);
        $templateVariable    = $templateProcessor->getVariables();
        foreach ($this->data as $variable => $value) {
            if (in_array($variable, $templateVariable)) {
                if (is_array($value)) {
                    $templateProcessor->cloneRow($variable, sizeof($value));  // Clonar.
                    // dd($value, $variable);
                    $i = 1;
                    foreach ($value as $k => $v) {
                        foreach ($v as $llave => $valor) {
                            // obtener el tipo de variable
                            $templateProcessor->setValue($llave . '#' . $i, $valor);
                        }
                        $i++;
                    }
                } else {
                    $templateProcessor->setValue($variable, $value);
                }
            }
        }

        $nameFileOutput = "{$this->nameFileOutput}.docx";
        $outputPath = storage_path("app/public/{$this->pathOutput}/$nameFileOutput");
        $templateProcessor->saveAs($outputPath);

        return $outputPath;
    }

    public function convertToPdf(string $filePath): string {
        $nameFileOutput = str_replace('.docx', '.pdf', $filePath);
        $outputPath = storage_path("app/public/{$this->pathOutput}");
        exec("libreoffice --invisible --convert-to pdf '$filePath' --outdir $outputPath", $aux, $return);
        return $nameFileOutput;
    }
}
