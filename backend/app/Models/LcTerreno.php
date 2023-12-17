<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcTerreno extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'lc_terreno';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'area_terreno',
        'avaluo_terreno',
        'manzana_vereda_codigo',
        'dimension',
        'geometria',
        'etiqueta',
        'relacion_superficie',
        'nivel',
        'comienzo_vida_util_version',
        'fin_vida_util_version',
        'espacio_de_nombres',
    ];

    public function lcdimension()
    {
        return $this->belongsTo(ColDimensionTipo::class, 'dimension');
    }

    public function relacionSuperficie()
    {
        return $this->belongsTo(ColRelacionSuperficieTipo::class, 'relacion_superficie', 't_id');
    }

    public function lcnivel()
    {
        return $this->belongsTo(LcNuNivel::class, 'nivel', 't_id');
    }
}
