<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcDatosAdicionalesLevantamientoCatastral extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'lc_datosadicionaleslevantamientocatastral';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        't_ili_tid',
        'tiene_area_registral',
        'area_registral_m2',
        'procedimiento_catastral_registral',
        'observaciones',
        'fecha_visita_predial',
        'tipo_documento_reconocedor',
        'numero_documento_reconocedor',
        'primer_nombre_reconocedor',
        'segundo_nombre_reconocedor',
        'primer_apellido_reconocedor',
        'segundo_apellido_reconocedor',
        'resultado_visita',
        'otro_cual_resultado_visita',
        'suscribe_acta_colindancia',
        'despojo_abandono',
        'estrato',
        'otro_cual_estrato',
        'lc_predio'
    ];

    // Relación con lc_predio
    public function lcPredio()
    {
        return $this->belongsTo(LcPredio::class, 'lc_predio');
    }

    public function procedimientoCatastralRegistraltipo()
    {
        return $this->belongsTo(LcProcedimientoCatastralRegistraltipo::class, 'procedimiento_catastral_registral', 't_id');
    }

    public function estructuraNovedadNumeroPredial()
    {
        return $this->hasMany(LcEstructuraNovedadNumeroPredial::class, 'lc_dtsdcnlstmntctstral_novedad_numeros_prediales', 't_id');
    }

    // Definición de la relación con lc_estructuranovedadfmi
    public function estructuraNovedadFMI()
    {
        return $this->hasMany(LcEstructuraNovedadFMI::class, 'lc_dtsdcnlstmstrl_nvdd_fmi', 't_id');
    }
}
