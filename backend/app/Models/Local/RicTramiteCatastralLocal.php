<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RicTramiteCatastralLocal extends Model
{
    use HasFactory;

    protected $table = 'ric_tramitecatastral';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'clasificacion_mutacion',
        'numero_resolucion',
        'fecha_resolucion',
        'fecha_radicacion',
        'ric_predio',
    ];


    public function mutacionTipo()
    {
        return $this->belongsTo(RicMutacionTipo::class, 'clasificacion_mutacion', 't_id');
    }

    public function ricPredio()
    {
        return $this->belongsTo(RicPredioLocal::class, 'ric_predio', 't_id');
    }
}
