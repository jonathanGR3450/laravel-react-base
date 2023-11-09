<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TabViv60Local extends Model
{
    use HasFactory;

    protected $table = 'tab_viv_60';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'zhg_no',
        'puntos',
        'valor',
        'vigencia',
    ];
}
