<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColUebaunit extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'col_uebaunit';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'ue_lc_servidumbretransito',
        'ue_lc_unidadconstruccion',
        'ue_lc_construccion',
        'ue_lc_terreno',
        'ue_lc_nu_espaciojuridicounidadedificacion',
        'ue_lc_nu_espaciojuridicoredservicios',
        'baunit',
    ];

    public function predio()
    {
        return $this->belongsTo(LcPredio::class, 'baunit');
    }

    public function construccion()
    {
        return $this->belongsTo(LcConstruccion::class, 'ue_lc_construccion');
    }

    public function terreno()
    {
        return $this->belongsTo(LcTerreno::class, 'ue_lc_terreno', 't_id');
    }

    public function unidadConstruccion()
    {
        return $this->belongsTo(LcUnidadconstruccion::class, 'ue_lc_unidadconstruccion', 't_id');
    }
}
