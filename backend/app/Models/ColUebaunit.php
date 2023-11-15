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

    public function lcPredio()
    {
        return $this->belongsTo(LcPredio::class, 'baunit');
    }

    public function lcConstruccion()
    {
        return $this->belongsTo(LcConstruccion::class, 'ue_lc_construccion');
    }

    // public function lcEspJuridicoRedServicios()
    // {
    //     return $this->belongsTo(LcEspacioJuridicoRedServicios::class, 'ue_lc_nu_espaciojuridicoredservicios');
    // }

    // public function lcEspJuridicoUnidadEdificacion()
    // {
    //     return $this->belongsTo(LcEspacioJuridicoUnidadEdificacion::class, 'ue_lc_nu_espaciojuridicounidadedificacion');
    // }

    // public function lcServidumbreTransito()
    // {
    //     return $this->belongsTo(LcServidumbreTransito::class, 'ue_lc_servidumbretransito');
    // }

    public function lcTerreno()
    {
        return $this->belongsTo(LcTerreno::class, 'ue_lc_terreno');
    }

    public function lcUnidadConstruccion()
    {
        return $this->belongsTo(LcUnidadConstruccion::class, 'ue_lc_unidadconstruccion');
    }
}
