<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcCalificacionNoConvencionalLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_calificacionnoconvencional';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        't_ili_tid',
        'tipo_anexo',
        'lc_unidad_construccion',
    ];

    // Relación con lc_anexotipo
    // public function tipoAnexo()
    // {
    //     return $this->belongsTo(LcAnexoTipo::class, 'tipo_anexo', 't_id');
    // }

    // Relación con lc_caracteristicasunidadconstruccion
    public function unidadConstruccion()
    {
        return $this->belongsTo(LcCaracteristicasUnidadConstruccionLocal::class, 'lc_unidad_construccion', 't_id');
    }
}
