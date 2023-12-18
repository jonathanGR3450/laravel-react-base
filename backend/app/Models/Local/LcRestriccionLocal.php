<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LcRestriccionLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_restriccion';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'tipo',
        'descripcion',
        'interesado_lc_interesado',
        'interesado_lc_agrupacioninteresados',
        'unidad',
        'comienzo_vida_util_version',
        'fin_vida_util_version',
        'espacio_de_nombres',
        'local_id',
    ];

    public function interesado()
    {
        return $this->belongsTo(LcInteresadoLocal::class, 'interesado_lc_interesado', 't_id');
    }

    public function agrupacionInteresados()
    {
        return $this->belongsTo(LcAgrupacionInteresadosLocal::class, 'interesado_lc_agrupacioninteresados', 't_id');
    }

    // public function tipo()
    // {
    //     return $this->belongsTo(LcRestriccionTipo::class, 'tipo', 't_id');
    // }

    public function unidad()
    {
        return $this->belongsTo(LcPredioLocal::class, 'unidad', 't_id');
    }

    public function colRrrFuente() : HasMany {
        return $this->hasMany(ColRrrfuenteLocal::class, 't_id', 'rrr_lc_restriccion');
    }
}
