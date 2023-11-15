<?php

namespace Database\Seeders;

use App\Models\Local\LcValorTerrenoRuralLocal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LcValorTerrenoRuralLocalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LcValorTerrenoRuralLocal::truncate();

        foreach ($this->data() as $valorTerreno) {
            LcValorTerrenoRuralLocal::create($valorTerreno);
        }
    }

    function data(): array
    {
        return [
            [
                'zona_economica' => '01',
                'valor_ha' => '1260000000.00',
                'valor_m2' => '126000',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '02',
                'valor_ha' => '900000000.00',
                'valor_m2' => '90000',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '03',
                'valor_ha' => '720000000.00',
                'valor_m2' => '72000',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '04',
                'valor_ha' => '600000000.00',
                'valor_m2' => '60000',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '05',
                'valor_ha' => '510000000.00',
                'valor_m2' => '51000',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '06',
                'valor_ha' => '360000000.00',
                'valor_m2' => '36000',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '07',
                'valor_ha' => '216000000.00',
                'valor_m2' => '21600',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '08',
                'valor_ha' => '174000000.00',
                'valor_m2' => '17400',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '09',
                'valor_ha' => '132000000.00',
                'valor_m2' => '13200',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '10',
                'valor_ha' => '114000000.00',
                'valor_m2' => '11400',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '11',
                'valor_ha' => '96000000.00',
                'valor_m2' => '9600',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '12',
                'valor_ha' => '84000000.00',
                'valor_m2' => '8400',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '13',
                'valor_ha' => '72000000.00',
                'valor_m2' => '7200',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '14',
                'valor_ha' => '55200000.00',
                'valor_m2' => '5520',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '15',
                'valor_ha' => '28800000.00',
                'valor_m2' => '2880',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '16',
                'valor_ha' => '21000000.00',
                'valor_m2' => '2100',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '17',
                'valor_ha' => '18000000.00',
                'valor_m2' => '1800',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '18',
                'valor_ha' => '15000000.00',
                'valor_m2' => '1500',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '19',
                'valor_ha' => '10800000.00',
                'valor_m2' => '1080',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '20',
                'valor_ha' => '6300000.00',
                'valor_m2' => '630',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '21',
                'valor_ha' => '4800000.00',
                'valor_m2' => '480',
                'vigencia' => '2023',
            ],
            [
                'zona_economica' => '22',
                'valor_ha' => '3300000.00',
                'valor_m2' => '330',
                'vigencia' => '2023',
            ],
        ];
    }
}
