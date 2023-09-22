<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcCaracteristicasUnidadConstruccion  extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'lc_caracteristicasunidadconstruccion';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'identificador',
        'tipo_construccion',
        'tipo_dominio',
        'tipo_unidad_construccion',
        'tipo_planta',
        'total_habitaciones',
        'total_banios',
        'total_locales',
        'total_plantas',
        'uso',
        'anio_construccion',
        'avaluo_unidad_construccion',
        'area_construida',
        'area_privada_construida',
        'observaciones',
        'comienzo_vida_util_version',
        'fin_vida_util_version',
        'espacio_de_nombres',
        'local_id',
    ];

    // Relación con lc_construcciontipo
    public function calificacionConvencional()
    {
        return $this->hasMany(LcCalificacionConvencional::class, 'lc_unidad_construccion');
    }

    public function calificacionNoConvencional()
    {
        return $this->hasMany(LcCalificacionNoConvencional::class, 'lc_unidad_construccion');
    }

    // // Relación con lc_construcciontipo
    public function tipoConstruccion()
    {
        return $this->belongsTo(LcConstruccionTipo::class, 'tipo_construccion');
    }

    // // Relación con lc_dominioconstrucciontipo
    public function tipoDominio()
    {
        return $this->belongsTo(LcDominioConstruccionTipo::class, 'tipo_dominio');
    }

    // // Relación con lc_unidadconstrucciontipo
    public function tipoUnidadConstruccion()
    {
        return $this->belongsTo(LcUnidadConstruccionTipo::class, 'tipo_unidad_construccion');
    }

    // // Relación con lc_construccionplantatipo
    public function tipoPlanta()
    {
        return $this->belongsTo(LcConstruccionPlantaTipo::class, 'tipo_planta');
    }

    // // Relación con lc_usouconstipo
    public function usoConstruccion()
    {
        return $this->belongsTo(LcUsoUconsTipo::class, 'uso');
    }
}
