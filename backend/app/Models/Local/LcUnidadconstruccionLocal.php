<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcUnidadconstruccionLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_unidadconstruccion';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'planta_ubicacion',
        'area_construida',
        'altura',
        'lc_caracteristicasunidadconstruccion',
        'lc_construccion',
        'dimension',
        'etiqueta',
        'relacion_superficie',
        'nivel',
        'comienzo_vida_util_version',
        'fin_vida_util_version',
        'espacio_de_nombres',
        'local_id',
    ];

    public function caracteristicasunidadconstruccion()
    {
        return $this->belongsTo(LcCaracteristicasUnidadConstruccionLocal::class, 'lc_caracteristicasunidadconstruccion', 't_id');
    }

    public function construccion()
    {
        return $this->belongsTo(LcConstruccionLocal::class, 'lc_construccion', 't_id');
    }

    // public function dimension()
    // {
    //     return $this->belongsTo('App\ColDimensiontipo', 'dimension');
    // }


    // public function nivel()
    // {
    //     return $this->belongsTo('App\LcNuNivel', 'nivel');
    // }

    // public function relacionSuperficie()
    // {
    //     return $this->belongsTo('App\ColRelacionsuperficietipo', 'relacion_superficie');
    // }
}