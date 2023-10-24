<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcPredioCopropiedadLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_predio_copropiedad';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'unidad_predial',
        'matriz',
        'coeficiente',
    ];

    public function unidadPredial()
    {
        return $this->belongsTo(LcPredioLocal::class, 'unidad_predial', 't_id');
    }

    public function matriz()
    {
        return $this->belongsTo(LcPredioLocal::class, 'matriz', 't_id');
    }
}
