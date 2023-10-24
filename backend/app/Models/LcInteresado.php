<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LcInteresado extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'lc_interesado';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
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

    public function miembro()
    {
        return $this->hasOne(ColMiembro::class, 'interesado_lc_interesado', 't_id');
    }

    function tipoInteresado(): BelongsTo {
        return $this->belongsTo(LcInteresadoTipo::class, 'tipo', 't_id');
    }

    function documentoTipo(): BelongsTo {
        return $this->belongsTo(LcInteresadoDocumentoTipo::class, 'tipo_documento', 't_id');
    }

    function sexoTipo(): BelongsTo {
        return $this->belongsTo(LcSexoTipo::class, 'sexo', 't_id');
    }

    function grupoEtnico(): BelongsTo {
        return $this->belongsTo(LcGrupoEtnicoTipo::class, 'grupo_etnico', 't_id');
    }

    function estadoCivil(): BelongsTo {
        return $this->belongsTo(LcEstadoCivilTipo::class, 'estado_civil', 't_id');
    }
}
