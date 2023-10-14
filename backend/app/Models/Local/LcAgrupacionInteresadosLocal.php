<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LcAgrupacionInteresadosLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_agrupacioninteresados';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        't_ili_tid',
        'tipo',
        'nombre',
        'comienzo_vida_util_version',
        'fin_vida_util_version',
        'espacio_de_nombres',
        'local_id',
    ];

    // Definir relación inversa para la relación 'agrupacionInteresados' en ColMiembroLocal
    public function miembrosAgrupacionInteresados()
    {
        return $this->hasMany(ColMiembroLocal::class, 't_id', 'interesado_lc_agrupacioninteresados');
    }

    // Definir relación inversa para la relación 'agrupacion' en ColMiembroLocal
    public function miembrosAgrupacion()
    {
        return $this->hasMany(ColMiembroLocal::class, 't_id', 'agrupacion');
    }

    // public function tipoInteresado()
    // {
    //     return $this->belongsTo(GrupointeresadoTipo::class, 'tipo');
    // }
}
