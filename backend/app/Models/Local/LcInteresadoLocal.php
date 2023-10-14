<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LcInteresadoLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_interesado';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        't_ili_tid',
        'tipo',
        'tipo_documento',
        'documento_identidad',
        'primer_nombre',
        'segundo_nombre',
        'primer_apellido',
        'segundo_apellido',
        'sexo',
        'grupo_etnico',
        'razon_social',
        'estado_civil',
        'nombre',
        'comienzo_vida_util_version',
        'fin_vida_util_version',
        'espacio_de_nombres',
        'local_id',
    ];

    function colMiembros() : HasMany {
        return $this->hasMany(ColMiembroLocal::class, 't_id', 'interesado_lc_interesado');
    }

    // public function tipo()
    // {
    //     return $this->belongsTo(Tipo::class, 'tipo');
    // }

    // public function tipoDocumento()
    // {
    //     return $this->belongsTo(TipoDocumento::class, 'tipo_documento');
    // }

    // public function sexo()
    // {
    //     return $this->belongsTo(Sexo::class, 'sexo');
    // }

    // public function grupoEtnico()
    // {
    //     return $this->belongsTo(GrupoEtnico::class, 'grupo_etnico');
    // }

    // public function estadoCivil()
    // {
    //     return $this->belongsTo(EstadoCivil::class, 'estado_civil');
    // }
}
