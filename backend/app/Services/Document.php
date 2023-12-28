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
    private $processor;

    public function __construct(string $path, string $nameFile, array $data, string $pathOutput) {
        $this->path = $path;
        $this->nameFile = $nameFile;
        $this->data = $data;
        $this->pathOutput = $pathOutput;

        $templatePath = public_path("{$this->path}/{$this->nameFile}");

        $this->processor = new TemplateProcessor($templatePath);
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
        
        $templateVariable    = $this->processor->getVariables();
        $TemplateInformation = $this->data;

        foreach ($templateVariable as $variable) {
            if (array_key_exists($variable, $TemplateInformation)) {
                $value = $TemplateInformation[$variable];
                if (is_array($value)) {
                    $this->processor->cloneRow($variable, sizeof($value));  // Clonar.
                    $i = 1;
                    foreach ($value as $k => $v) {
                        foreach ($v as $llave => $valor) {
                            $this->print($llave . '#' . $i, $valor, 1);
                        }
                        $i++;
                    }
                } else {
                    $this->print($variable, $value, 1);
                }
            } else {
                $this->print($variable, '', 1);
            }
        }

        $nameFileOutput = "{$this->nameFileOutput}.docx";
        $outputPath = storage_path("app/public/{$this->pathOutput}/$nameFileOutput");
        $this->processor->saveAs($outputPath);

        return $outputPath;
    }

    public function print($variable, $texto, $tipo)
    {
        if (is_null($texto)) {
            $this->processor->setValue($variable, '');
            return;
        }
        switch ($tipo) {
            case '1':
                $this->processor->setValue($variable, $texto);
                break;
            default:
                $this->processor->setValue($variable, '');
                break;
        }
    }
    

    public function convertToPdf(string $filePath): string {
        $nameFileOutput = str_replace('.docx', '.pdf', $filePath);
        $outputPath = storage_path("app/public/{$this->pathOutput}");
        exec("libreoffice --invisible --convert-to pdf '$filePath' --outdir $outputPath", $aux, $return);
        return $nameFileOutput;
    }
}
