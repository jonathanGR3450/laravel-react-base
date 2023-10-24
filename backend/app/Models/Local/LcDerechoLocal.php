<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcDerechoLocal extends Model
{
    use HasFactory;

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
    ];

    // Relación con lc_derechotipo
    public function lcDerechoTipo()
    {
        return $this->belongsTo(LcDerechoTipo::class, 'tipo');
    }

    // // Relación con lc_interesado (Interesado)
    public function interesado()
    {
        return $this->belongsTo(LcInteresadoLocal::class, 'interesado_lc_interesado', 't_id');
    }

    // // Relación con lc_agrupacioninteresados (Agrupación de Interesados)
    public function agrupacionInteresados()
    {
        return $this->belongsTo(LcAgrupacionInteresadosLocal::class, 'interesado_lc_agrupacioninteresados');
    }

    // // Relación con lc_predio (Unidad)
    public function predio()
    {
        return $this->belongsTo(LcPredioLocal::class, 'unidad');
    }
}
