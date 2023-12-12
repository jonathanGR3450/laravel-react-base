<?php

namespace Database\Seeders;

use App\Models\TramiteTipo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TramiteTipoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TramiteTipo::truncate();
        foreach ($this->data() as $tramite) {
            $tramite['descripcion'] = Str::slug($tramite['nombre']);
            TramiteTipo::create($tramite);
        }
    }

    function data() : array {
        return [
            ['nombre' => '1.1. CAMBIO DE PROPIETARIO A SOLICITUD DE INTERESADOS_actualizada_21-09-2023'],
            ['nombre' => '2.2. Desenglobes'],
            ['nombre' => '2.3. ENGLOBE actualizada 21-09-2023'],
            ['nombre' => '3.1. INCORPORACIÓN DE CONSTRUCCIÓN actualizada 21-09-2023'],
            ['nombre' => '3.2. DEMOLICIÓN DE CONSTRUCCIÓN actualizada 21-09-2023'],
            ['nombre' => '3.3. CAMBIO DESTINO ECONÓMICO actualizada 21-09-2023'],
            ['nombre' => '4.1. REVISIÓN DE AVALÚO MODIFICA actualizada 21-09-2023'],
            ['nombre' => '4.2. REVISIÓN DE AVALÚO CONFIRMA actualizada 21-09-2023'],
            ['nombre' => '4.3 REVISIÓN DE AVALÚO DE OFICIO POR INCONSISTENCIA EN LA LIQUIDACIÓN_actualizada_21-09-2023'],
            ['nombre' => '4.4._AUTOESTIMACIÓN DE AVALÚO CONCEDE actualizada 21-09-2023 '],
            ['nombre' => '4.5. AUTOESTIMACIÓN DE AVALÚO RECHAZA actualizada 21-09-2023'],
            ['nombre' => '5.1_INSCRIPCION DE PREDIO NUEVO actualizada 21-09-2023'],
            ['nombre' => '5.3. INSCRIPCIÓN DE MEJORA actualizada 21-09-2023'],
            ['nombre' => '6.2. RECTIFICACIÓN ÁREA PARA CONTINUAR CON TRÁMITE actualizada 21-09-2023'],
        ];
    }
}
