<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class LcNumerosPredialLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_numeros_prediales';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'numero_predial',
        'matricula_inmobiliaria',
        'taken',
    ];

    function direccion(): HasOne {
        return $this->hasOne(ExtDireccionLocal::class, 'lc_numeros_prediales_id', 't_id');
    }
}
