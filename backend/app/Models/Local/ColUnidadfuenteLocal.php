<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColUnidadfuenteLocal extends Model
{
    use HasFactory;

    protected $table = 'col_unidadfuente';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'fuente_administrativa',
        'unidad',
    ];

    public function fuenteAdministrativa()
    {
        return $this->belongsTo(LcFuenteadministrativaLocal::class, 'fuente_administrativa', 't_id');
    }

    public function unidad()
    {
        return $this->belongsTo(LcPredioLocal::class, 'unidad', 't_id');
    }
}
