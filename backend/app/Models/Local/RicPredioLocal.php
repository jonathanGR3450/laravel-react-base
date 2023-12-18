<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RicPredioLocal extends Model
{
    use HasFactory;

    protected $table = 'ric_predio';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'fecha_inscripcion_catastral',
        'zona',
        'vigencia_actualizacion_catastral',
        'estado',
        'catastro',
        'ric_gestorcatastral',
        'ric_operadorcatastral',
        'nombre',
        'comienzo_vida_util_version',
        'fin_vida_util_version',
        'espacio_de_nombres',
        'local_id',
        'lc_predio',
    ];

    // public function gestorCatastral()
    // {
    //     return $this->belongsTo(RicGestorCatastral::class, 'ric_gestorcatastral', 't_id');
    // }

    // public function operadorCatastral()
    // {
    //     return $this->belongsTo(RicOperadorCatastral::class, 'ric_operadorcatastral', 't_id');
    // }

    // public function catastroTipo()
    // {
    //     return $this->belongsTo(RicCatastroTipo::class, 'catastro', 't_id');
    // }

    // public function estadoTipo()
    // {
    //     return $this->belongsTo(RicEstadoTipo::class, 'estado', 't_id');
    // }

    // public function zonaTipo()
    // {
    //     return $this->belongsTo(RicZonaTipo::class, 'zona', 't_id');
    // }

    public function ricTramiteCatastral()
    {
        return $this->hasMany(RicTramiteCatastralLocal::class, 'ric_predio', 't_id');
    }

    public function ricPredioTramiteCatastral()
    {
        return $this->hasMany(RicPredioTramiteCatastralLocal::class, 'ric_predio', 't_id');
    }

    public function lcPredio()
    {
        return $this->belongsTo(LcPredioLocal::class, 'lc_predio', 't_id');
    }
}
