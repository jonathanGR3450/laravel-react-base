<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcValorTerrenoUrbanaLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_valor_terreno_urbana';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'zhg_no',
        'valor',
        'vigencia',
    ];
}
