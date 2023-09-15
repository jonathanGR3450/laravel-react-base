<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcObjetoConstruccionLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_objetoconstruccion';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'tipo_objeto_construccion',
        'puntos',
        'lc_grupo_calificacion',
    ];

    // public function tipoObjetoConstruccion()
    // {
    //     return $this->belongsTo(LcObjetoConstruccionTipo::class, 'tipo_objeto_construccion', 't_id');
    // }

    public function grupoCalificacion()
    {
        return $this->belongsTo(LcGrupoCalificacionLocal::class, 'lc_grupo_calificacion', 't_id');
    }
}
