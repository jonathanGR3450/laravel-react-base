<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcDerecho extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'lc_derecho';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'tipo',
        'fraccion_derecho',
        'fecha_inicio_tenencia',
        'descripcion',
        'interesado_lc_interesado',
        'interesado_lc_agrupacioninteresados',
        'unidad',
        'comienzo_vida_util_version',
        'fin_vida_util_version',
        'espacio_de_nombres',
        'local_id'
    ];

    // Relación con lc_derechotipo
    public function lcDerechoTipo()
    {
        return $this->belongsTo(LcDerechoTipo::class, 'tipo');
    }

    // Relación con lc_interesado (Interesado)
    public function interesado()
    {
        return $this->belongsTo(LcInteresado::class, 'interesado_lc_interesado', 't_id');
    }

    // Relación con lc_agrupacioninteresados (Agrupación de Interesados)
    public function lcAgrupacionInteresados()
    {
        return $this->belongsTo(LcAgrupacionInteresados::class, 'interesado_lc_agrupacioninteresados');
    }

    // Relación con lc_predio (Unidad)
    public function lcPredio()
    {
        return $this->belongsTo(LcPredio::class, 'unidad');
    }

    public function colRrrFuente()
    {
        return $this->hasMany(ColRrrfuente::class, 'rrr_lc_derecho');
    }
}
