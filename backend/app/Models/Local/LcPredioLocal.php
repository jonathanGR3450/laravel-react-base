<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LcPredioLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_predio';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'departamento',
        'municipio',
        'id_operacion',
        'tiene_fmi',
        'codigo_orip',
        'matricula_inmobiliaria',
        'numero_predial',
        'numero_predial_anterior',
        'codigo_homologado',
        'interrelacionado',
        'codigo_homologado_fmi',
        'nupre',
        'avaluo_catastral',
        'valor_referencia',
        'tipo',
        'condicion_predio',
        'destinacion_economica',
        'clase_suelo',
        'categoria_suelo',
        'nombre',
        'comienzo_vida_util_version',
        'fin_vida_util_version',
        'espacio_de_nombres',
        'local_id'
    ];

    // // Relación con lc_categoria_suelo_tipo
    // public function categoriaSuelo()
    // {
    //     return $this->belongsTo(LcCategoriaSueloTipo::class, 'categoria_suelo');
    // }

    // // Relación con lc_clase_suelo_tipo
    // public function claseSuelo()
    // {
    //     return $this->belongsTo(LcClaseSueloTipo::class, 'clase_suelo');
    // }

    // // Relación con lc_condicion_predio_tipo
    // public function condicionPredio()
    // {
    //     return $this->belongsTo(LcCondicionPredioTipo::class, 'condicion_predio');
    // }

    // // Relación con lc_destinacion_economica_tipo
    // public function destinacionEconomica()
    // {
    //     return $this->belongsTo(LcDestinacionEconomicaTipo::class, 'destinacion_economica');
    // }

    // // Relación con lc_predio_tipo
    // public function tipoPredio()
    // {
    //     return $this->belongsTo(LcPredioTipo::class, 'tipo');
    // }

    // // Relación con lc_datosadicionaleslevantamientocatastral
    // public function datosAdicionalesLevantamientoCatastral()
    // {
    //     return $this->hasOne(LcDatosAdicionalesLevantamientoCatastral::class, 'lc_predio');
    // }

    // // Relación con lc_datosphcondominio
    // public function lcDatosPhCondominio()
    // {
    //     return $this->hasOne(lcDatosPhCondominio::class, 'lc_predio');
    // }

    // // Relación con lc_derecho (Unidades)
    // public function lcDerechos()
    // {
    //     return $this->hasMany(LcDerecho::class, 'unidad');
    // }

    // // Relación con extreferenciaregistralsistemaantiguo
    // public function referenciasSistemaAntiguo()
    // {
    //     return $this->hasOne(ExtReferenciaRegistralSistemaAntiguo::class, 'lc_predio_referencia_registral_sistema_antiguo', 't_id');
    // }

    // public function extDireccion()
    // {
    //     return $this->hasMany(ExtDireccion::class, 'lc_predio_direccion', 't_id');
    // }

    function lcRestricion() : HasMany {
        return $this->hasMany(LcRestriccionLocal::class, 't_id', 'unidad');
    }
}
