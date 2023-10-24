<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcDatosPhCondominio extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

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
        'lc_predio'
    ];

    // Relación con lc_predio
    public function lcPredio()
    {
        return $this->belongsTo(LcPredio::class, 'lc_predio');
    }
}
