<?php

namespace App\Models\Local;

use App\Models\TramiteTipo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TramiteRadicadoLocal extends Model
{
    use HasFactory;

    protected $table = 'tramite_radicado';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'radicado',
        'id',
        'tipo_tramite',
        'fecha_radicado',
        'tipo_predio',
        'numero_predial',
        'estado',
        'fecha_notificacion',
        'metodo_notificacion',
        'observaciones',
    ];

}
