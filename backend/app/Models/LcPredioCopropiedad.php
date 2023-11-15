<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcPredioCopropiedad extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

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
        return $this->belongsTo(LcPredio::class, 'unidad_predial', 't_id');
    }

    public function matriz()
    {
        return $this->belongsTo(LcPredio::class, 'matriz', 't_id');
    }
}
