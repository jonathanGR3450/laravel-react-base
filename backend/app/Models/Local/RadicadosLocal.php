<?php

namespace App\Models\Local;

use App\Models\TramiteTipo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RadicadosLocal extends Model
{
    use HasFactory;

    protected $table = 'radicados';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'url',
        'no_radicado',
        'asociado_id',
        'tramite_id',
    ];

    function tipoRadicado(): BelongsTo {
        return $this->belongsTo(TramiteTipo::class, 'tramite_id', 'id');
    }

}
