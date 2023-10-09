<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class LcNumerosHomologadosLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_numeros_homologados';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'numeros_homologados',
        'taken',
        'lc_numeros_prediales_id',
    ];

    function numeroPredial(): HasOne {
        return $this->hasOne(LcNumerosPredialLocal::class, 'lc_numeros_prediales_id', 't_id');
    }
}
