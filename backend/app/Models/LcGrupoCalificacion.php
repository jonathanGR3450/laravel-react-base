<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LcGrupoCalificacion extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'lc_grupocalificacion';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'clase_calificacion',
        'conservacion',
        'subtotal',
        'lc_calificacion_convencional',
    ];

    // public function claseCalificacion()
    // {
    //     return $this->belongsTo(LcClaseCalificacionTipo::class, 'clase_calificacion', 't_id');
    // }

    // public function estadoConservacion()
    // {
    //     return $this->belongsTo(LcEstadoConservacionTipo::class, 'conservacion', 't_id');
    // }

    public function calificacionConvencional()
    {
        return $this->belongsTo(LcCalificacionConvencional::class, 'lc_calificacion_convencional', 't_id');
    }

    function objetoConstruccion() : HasMany {
        return $this->hasMany(LcObjetoConstruccion::class, 'lc_grupo_calificacion');
    }
}
