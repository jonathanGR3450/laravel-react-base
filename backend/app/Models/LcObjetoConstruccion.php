<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcObjetoConstruccion extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'lc_objetoconstruccion';
    protected $primaryKey = 't_id';

    protected $fillable = [
        'tipo_objeto_construccion',
        'puntos',
        'lc_grupo_calificacion',
    ];

    public function tipoObjetoConstruccion()
    {
        return $this->belongsTo(LcObjetoConstruccionTipo::class, 'tipo_objeto_construccion', 't_id');
    }

    public function grupoCalificacion()
    {
        return $this->belongsTo(LcGrupoCalificacion::class, 'lc_grupo_calificacion', 't_id');
    }
}
