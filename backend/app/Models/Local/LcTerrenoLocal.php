<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcTerrenoLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_terreno';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'area_terreno',
        'avaluo_terreno',
        'manzana_vereda_codigo',
        'dimension',
        'etiqueta',
        'relacion_superficie',
        'nivel',
        'comienzo_vida_util_version',
        'fin_vida_util_version',
        'espacio_de_nombres',
        'local_id',
        't_id_conservacion',
    ];

    // public function dimension()
    // {
    //     return $this->belongsTo(ColDimensionTipo::class, 'dimension', 'id');
    // }

    // public function relacionSuperficie()
    // {
    //     return $this->belongsTo(ColRelacionSuperficieTipo::class, 'relacion_superficie', 'id');
    // }

    // public function nivel()
    // {
    //     return $this->belongsTo(LcNuNivel::class, 'nivel', 'id');
    // }
}
