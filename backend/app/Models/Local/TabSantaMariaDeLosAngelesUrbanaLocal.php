<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TabSantaMariaDeLosAngelesUrbanaLocal extends Model
{
    use HasFactory;

    protected $table = 'tab_santa_maria_de_los_angeles_urbana';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'puntos',
        'valor',
        'vigencia',
    ];
}
