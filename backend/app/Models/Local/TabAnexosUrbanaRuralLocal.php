<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TabAnexosUrbanaRuralLocal extends Model
{
    use HasFactory;

    protected $table = 'tab_anexos_urbana_rural';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'puntos',
        'valor',
        'destino',
        'vigencia',
        'tipo',
    ];
}
