<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LcFuenteadministrativaLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_fuenteadministrativa';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'tipo',
        'ente_emisor',
        'observacion',
        'numero_fuente',
        'estado_disponibilidad',
        'tipo_principal',
        'fecha_documento_fuente',
        'espacio_de_nombres',
    ];

    function colRrrFuente() : HasMany {
        return $this->hasMany(ColRrrfuenteLocal::class, 't_id', 'fuente_administrativa');
    }

    // public function fuenteAdministrativaTipo()
    // {
    //     return $this->belongsTo(ColFuenteadministrativaTipo::class, 'tipo', 't_id');
    // }

    // public function estadoDisponibilidadTipo()
    // {
    //     return $this->belongsTo(ColEstadoDisponibilidadTipo::class, 'estado_disponibilidad', 't_id');
    // }

    // public function formaPresentacionCodigo()
    // {
    //     return $this->belongsTo(CiFormaPresentacionCodigo::class, 'tipo_principal', 't_id');
    // }
}
