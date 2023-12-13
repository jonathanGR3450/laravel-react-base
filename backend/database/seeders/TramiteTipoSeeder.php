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
            ['nombre' => '10. RESOLUCIÓN CATASTRAL TRÁMITE ARCHIVADO POR NO APORTAR DOCUMENTOS_actualizada_19-05-2023'],
            ['nombre' => '11. RESOLUCIÓN CATASTRAL TRÁMITE ARCHIVADO POR NO ATENDER VISITA_actualizada_29-05-2023'],
            ['nombre' => '2.1. DESENGLOBE actualizada 21-09-2023'],
            ['nombre' => '2.2. DESENGLOBE PH POR ETAPAS actualizada 21-09-2023'],
            ['nombre' => '2.3. ENGLOBE actualizada 21-09-2023'],
            ['nombre' => '2.3. REDISTRIBUCIÓN DE COEFICIENTES DE COPROPIEDAD'],
            ['nombre' => '3.1. INCORPORACIÓN DE CONSTRUCCIÓN actualizada 21-09-2023'],
            ['nombre' => '3.2. DEMOLICIÓN DE CONSTRUCCIÓN actualizada 21-09-2023'],
            ['nombre' => '3.3. CAMBIO DESTINO ECONÓMICO actualizada 21-09-2023'],
            ['nombre' => '4.1. REVISIÓN DE AVALÚO MODIFICA actualizada 21-09-2023'],
            ['nombre' => '4.2. REVISIÓN DE AVALÚO CONFIRMA actualizada 21-09-2023'],
            ['nombre' => '4.3 REVISIÓN DE AVALÚO DE OFICIO POR INCONSISTENCIA EN LA LIQUIDACIÓN_actualizada_21-09-2023'],
            ['nombre' => '4.4._AUTOESTIMACIÓN DE AVALÚO CONCEDE actualizada 21-09-2023 '],
            ['nombre' => '4.5. AUTOESTIMACIÓN DE AVALÚO RECHAZA actualizada 21-09-2023'],
            ['nombre' => '5.1_INSCRIPCION DE PREDIO NUEVO actualizada 21-09-2023'],
            ['nombre' => '5.2_INSCRIPCIÓN DE PREDIO OMITIDO actualizada 21-09-2023'],
            ['nombre' => '5.3. INSCRIPCIÓN DE MEJORA actualizada 21-09-2023'],
            ['nombre' => '6.1. RECTIFICACIONES DE OFICINA actualizada 21-09-2023'],
            ['nombre' => '6.2. RECTIFICACIÓN ÁREA PARA CONTINUAR CON TRÁMITE actualizada 21-09-2023'],
            ['nombre' => '6.3. RECTIFICACIÓN DE ÁREA DE TERRENO SEGÚN TÍTULOS actualizada 21-09-2023'],
            ['nombre' => '6.4. RECTIFICACIÓN DE ÁREA CONSTRUIDA actualizada 21-09-2023'],
            ['nombre' => '6.5. RECTIFICACIÓN DE ÁREA DE TERRENO Y CONSTRUIDA actualizada 21-09-2023'],
            ['nombre' => '6.6. RECTIFICACIÓN POR CANCELACIÓN DE DOBLE INSCRIPCIÓN actualizada 21-09-2023'],
            ['nombre' => '7. CANCELACIÓN DE MEJORA'],
            ['nombre' => '9.1. CAMBIO DE REFERENCIA POR ASIGNACIÓN DE NÚMERO YA VIGENTE EN LA BASE actualizada 21-09-2023'],
            ['nombre' => '9.2. CAMBIO DE REFERENCIA POR INCONSISTENCIA EN LA CONDICIÓN DE PROPIEDAD actualizada 21-09-2023'],
            ['nombre' => 'CORRECCIÓN CARTOGRAFÍA'],
            ['nombre' => 'FORMATO DE ARCHIVO DE RESOLUCIONES 1101 actualizado 21-09-2023'],
        ];
    }
}
