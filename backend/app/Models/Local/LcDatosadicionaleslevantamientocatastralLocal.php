<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcDatosadicionaleslevantamientocatastralLocal extends Model
{
    use HasFactory;

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
        'lc_predio',
    ];

    public function predio()
    {
        return $this->belongsTo(LcPredioLocal::class, 'lc_predio', 't_id');
    }

    // public function procedimientoCatastralRegistral()
    // {
    //     return $this->belongsTo(LcProcedimientoCatastralRegistraltipo::class, 'procedimiento_catastral_registral', 't_id');
    // }

    // public function tipoDocumentoReconocedor()
    // {
    //     return $this->belongsTo(LcInteresadodocumentotipo::class, 'tipo_documento_reconocedor', 't_id');
    // }

    // public function resultadoVisita()
    // {
    //     return $this->belongsTo(LcResultadovisitatipo::class, 'resultado_visita', 't_id');
    // }

    // public function estrato()
    // {
    //     return $this->belongsTo(LcEstratotipo::class, 'estrato', 't_id');
    // }
}
