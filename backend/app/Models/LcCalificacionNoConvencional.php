<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcCalificacionNoConvencional extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'lc_calificacionnoconvencional';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'tipo_anexo',
        'lc_unidad_construccion',
    ];

    // Relación con lc_anexotipo
    public function tipoAnexo()
    {
        return $this->belongsTo(LcAnexoTipo::class, 'tipo_anexo', 't_id');
    }

    // Relación con lc_caracteristicasunidadconstruccion
    public function unidadConstruccion()
    {
        return $this->belongsTo(LcCaracteristicasUnidadConstruccion::class, 'lc_unidad_construccion', 't_id');
    }
}
