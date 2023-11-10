<?php

namespace Database\Seeders;

use App\Models\Local\LcValorTerrenoUrbanaLocal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LcValorTerrenoUrbanaLocalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LcValorTerrenoUrbanaLocal::truncate();

        foreach ($this->data() as $valorTerreno) {
            LcValorTerrenoUrbanaLocal::create($valorTerreno);
        }
    }

    function data(): array {
        return [
            ['zhg_no' => '01', 'valor' => 1260000, 'vigencia' => 2022],
            ['zhg_no' => '02', 'valor' => 1170000, 'vigencia' => 2022],
            ['zhg_no' => '03', 'valor' => 1020000, 'vigencia' => 2022],
            ['zhg_no' => '04', 'valor' => 750000, 'vigencia' => 2022],
            ['zhg_no' => '05', 'valor' => 660000, 'vigencia' => 2022],
            ['zhg_no' => '06', 'valor' => 600000, 'vigencia' => 2022],
            ['zhg_no' => '07', 'valor' => 540000, 'vigencia' => 2022],
            ['zhg_no' => '08', 'valor' => 480000, 'vigencia' => 2022],
            ['zhg_no' => '09', 'valor' => 450000, 'vigencia' => 2022],
            ['zhg_no' => '10', 'valor' => 330000, 'vigencia' => 2022],
            ['zhg_no' => '11', 'valor' => 270000, 'vigencia' => 2022],
            ['zhg_no' => '12', 'valor' => 216000, 'vigencia' => 2022],
            ['zhg_no' => '13', 'valor' => 132000, 'vigencia' => 2022],
            ['zhg_no' => '14', 'valor' => 99000, 'vigencia' => 2022],
            ['zhg_no' => '15', 'valor' => 78000, 'vigencia' => 2022],
            ['zhg_no' => '16', 'valor' => 60000, 'vigencia' => 2022],
            ['zhg_no' => '17', 'valor' => 30000, 'vigencia' => 2022],
            ['zhg_no' => '18', 'valor' => 7200, 'vigencia' => 2022],
            ['zhg_no' => '01', 'valor' => 1260000, 'vigencia' => 2023],
            ['zhg_no' => '02', 'valor' => 1170000, 'vigencia' => 2023],
            ['zhg_no' => '03', 'valor' => 1020000, 'vigencia' => 2023],
            ['zhg_no' => '04', 'valor' => 750000, 'vigencia' => 2023],
            ['zhg_no' => '05', 'valor' => 660000, 'vigencia' => 2023],
            ['zhg_no' => '06', 'valor' => 600000, 'vigencia' => 2023],
            ['zhg_no' => '07', 'valor' => 540000, 'vigencia' => 2023],
            ['zhg_no' => '08', 'valor' => 480000, 'vigencia' => 2023],
            ['zhg_no' => '09', 'valor' => 450000, 'vigencia' => 2023],
            ['zhg_no' => '10', 'valor' => 330000, 'vigencia' => 2023],
            ['zhg_no' => '11', 'valor' => 270000, 'vigencia' => 2023],
            ['zhg_no' => '12', 'valor' => 216000, 'vigencia' => 2023],
            ['zhg_no' => '13', 'valor' => 132000, 'vigencia' => 2023],
            ['zhg_no' => '14', 'valor' => 99000, 'vigencia' => 2023],
            ['zhg_no' => '15', 'valor' => 78000, 'vigencia' => 2023],
            ['zhg_no' => '16', 'valor' => 60000, 'vigencia' => 2023],
            ['zhg_no' => '17', 'valor' => 30000, 'vigencia' => 2023],
            ['zhg_no' => '18', 'valor' => 7200, 'vigencia' => 2023],
        ];
    }
}
