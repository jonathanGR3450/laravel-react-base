<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcIncrementoAvaluoLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_incremento_avaluos';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'concepto',
        'incremento',
        'vigencia',
    ];
}
