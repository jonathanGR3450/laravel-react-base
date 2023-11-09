<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TabSantaMariaDeLosAngelesLocal extends Model
{
    use HasFactory;

    protected $table = 'tab_santa_maria_de_los_angeles';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'zhg_no',
        'puntos',
        'valor',
        'vigencia',
    ];
}
