<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LcCalificacionConvencional extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'lc_calificacionconvencional';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'tipo_calificar',
        'total_calificacion',
        'lc_unidad_construccion',
    ];

    public function tipoCalificar()
    {
        return $this->belongsTo(LcCalificarTipo::class, 'tipo_calificar', 't_id');
    }

    public function unidadConstruccion()
    {
        return $this->belongsTo(LcCaracteristicasUnidadConstruccion::class, 'lc_unidad_construccion', 't_id');
    }

    public function grupoCalificacion() : HasMany {
        return $this->hasMany(LcGrupoCalificacion::class, 'lc_calificacion_convencional');
    }
}
