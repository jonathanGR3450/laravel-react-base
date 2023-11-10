<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TabBod60UrbanaRuralLocal extends Model
{
    use HasFactory;

    protected $table = 'tab_bod_60_urbana_rural';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'puntos',
        'valor',
        'vigencia',
        'tipo',
    ];
}
