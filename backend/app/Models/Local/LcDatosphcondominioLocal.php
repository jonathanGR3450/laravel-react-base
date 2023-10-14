<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcDatosphcondominioLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_datosphcondominio';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'area_total_terreno',
        'area_total_terreno_privada',
        'area_total_terreno_comun',
        'area_total_construida',
        'area_total_construida_privada',
        'area_total_construida_comun',
        'numero_torres',
        'total_unidades_privadas',
        'lc_predio',
    ];

    public function predio()
    {
        return $this->belongsTo(LcPredioLocal::class, 'lc_predio', 't_id');
    }
}
