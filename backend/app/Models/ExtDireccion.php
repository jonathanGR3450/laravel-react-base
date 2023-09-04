<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExtDireccion extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'extdireccion';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        't_seq',
        'tipo_direccion',
        'es_direccion_principal',
        'localizacion',
        'codigo_postal',
        'clase_via_principal',
        'valor_via_principal',
        'letra_via_principal',
        'sector_ciudad',
        'valor_via_generadora',
        'letra_via_generadora',
        'numero_predio',
        'sector_predio',
        'complemento',
        'nombre_predio',
        'extunidadedificcnfsica_ext_direccion_id',
        'extinteresado_ext_direccion_id',
        'lc_construccion_ext_direccion_id',
        'lc_nu_spcjrdcrdsrvcios_ext_direccion_id',
        'lc_n_spcjrdcndddfccion_ext_direccion_id',
        'lc_terreno_ext_direccion_id',
        'lc_unidadconstruccion_ext_direccion_id',
        'lc_predio_direccion',
        'lc_servidumbretransito_ext_direccion_id',
    ];

    // Relaciones
    // public function extUnidadEdificacion()
    // {
    //     return $this->belongsTo(ExtUnidadEdificacion::class, 'extunidadedificcnfsica_ext_direccion_id', 't_id');
    // }

    // public function extInteresado()
    // {
    //     return $this->belongsTo(ExtInteresado::class, 'extinteresado_ext_direccion_id', 't_id');
    // }

    // public function lcConstruccion()
    // {
    //     return $this->belongsTo(LcConstruccion::class, 'lc_construccion_ext_direccion_id', 't_id');
    // }

    // public function lcNuEspacioJuridicoRedServicios()
    // {
    //     return $this->belongsTo(LcNuEspacioJuridicoRedServicios::class, 'lc_nu_spcjrdcrdsrvcios_ext_direccion_id', 't_id');
    // }

    // public function lcNuEspacioJuridicoUnidadEdificacion()
    // {
    //     return $this->belongsTo(LcNuEspacioJuridicoUnidadEdificacion::class, 'lc_n_spcjrdcndddfccion_ext_direccion_id', 't_id');
    // }

    // public function lcTerreno()
    // {
    //     return $this->belongsTo(LcTerreno::class, 'lc_terreno_ext_direccion_id', 't_id');
    // }

    // public function lcUnidadConstruccion()
    // {
    //     return $this->belongsTo(LcUnidadConstruccion::class, 'lc_unidadconstruccion_ext_direccion_id', 't_id');
    // }

    public function lcPredio()
    {
        return $this->belongsTo(LcPredio::class, 'lc_predio_direccion', 't_id');
    }

    // public function lcServidumbreTransito()
    // {
    //     return $this->belongsTo(LcServidumbreTransito::class, 'lc_servidumbretransito_ext_direccion_id', 't_id');
    // }
}
