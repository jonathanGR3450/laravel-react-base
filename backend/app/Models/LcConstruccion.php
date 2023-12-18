<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LcConstruccion extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'lc_construccion';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'identificador',
        'tipo_construccion',
        'tipo_dominio',
        'numero_pisos',
        'numero_sotanos',
        'numero_mezanines',
        'numero_semisotanos',
        'anio_construccion',
        'avaluo_construccion',
        'valor_referencia_construccion',
        'area_construccion',
        'altura',
        'observaciones',
        'dimension',
        'etiqueta',
        'relacion_superficie',
        'nivel',
        'comienzo_vida_util_version',
        'fin_vida_util_version',
        'espacio_de_nombres',
        'local_id',
    ];

    public function lcdimension()
    {
        return $this->belongsTo(ColDimensionTipo::class, 'dimension', 't_id');
    }

    public function lcnivel()
    {
        return $this->belongsTo(LcNuNivel::class, 'nivel', 't_id');
    }

    public function relacionSuperficie()
    {
        return $this->belongsTo(ColRelacionSuperficieTipo::class, 'relacion_superficie', 't_id');
    }

    public function tipoConstruccion()
    {
        return $this->belongsTo(LcConstruccionTipo::class, 'tipo_construccion', 't_id');
    }

    public function tipoDominio()
    {
        return $this->belongsTo(LcDominioConstruccionTipo::class, 'tipo_dominio', 't_id');
    }
}
