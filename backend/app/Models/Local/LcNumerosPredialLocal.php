<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcNumerosPredialLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_numeros_prediales';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'numero_predial',
        'taken',
    ];
}
