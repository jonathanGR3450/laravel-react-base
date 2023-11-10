<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcValorTerrenoRuralLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_valor_terreno_rural';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'zona_economica',
        'valor_ha',
        'valor_m2',
        'vigencia',
    ];
}
