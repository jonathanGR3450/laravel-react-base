<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcContactoVisitaLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_contactovisita';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'tipo_documento_quien_atendio',
        'numero_documento_quien_atendio',
        'primer_nombre_quien_atendio',
        'segundo_nombre_quien_atendio',
        'primer_apellido_quien_atendio',
        'segundo_apellido_quien_atendio',
        'domicilio_notificaciones',
        'celular',
        'correo_electronico',
        'autoriza_notificaciones',
        'lc_datos_adicionales',
    ];

    protected $casts = [
        'autoriza_notificaciones' => 'boolean',
    ];

    public function datosAdicionales()
    {
        return $this->belongsTo(LcDatosadicionaleslevantamientocatastralLocal::class, 'lc_datos_adicionales', 't_id');
    }

    // public function tipoDocumento()
    // {
    //     return $this->belongsTo(LcInteresadoDocumentoTipo::class, 'tipo_documento_quien_atendio', 't_id');
    // }
}
