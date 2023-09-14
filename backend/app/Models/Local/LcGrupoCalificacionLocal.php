<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LcGrupoCalificacionLocal extends Model
{
    use HasFactory;

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
        return $this->belongsTo(LcCalificacionConvencionalLocal::class, 'lc_calificacion_convencional', 't_id');
    }

    function objetoConstruccion() : HasMany {
        return $this->hasMany(LcObjetoConstruccionLocal::class, 'lc_grupo_calificacion');
    }
}
