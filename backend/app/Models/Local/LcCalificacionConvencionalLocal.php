<?php

namespace App\Models\Local;

use App\Models\LcCalificarTipo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LcCalificacionConvencionalLocal extends Model
{
    use HasFactory;

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
        return $this->belongsTo(LcCaracteristicasUnidadConstruccionLocal::class, 'lc_unidad_construccion', 't_id');
    }

    public function grupoCalificacion() : HasMany {
        return $this->hasMany(LcGrupoCalificacionLocal::class, 'lc_calificacion_convencional');
    }
}
