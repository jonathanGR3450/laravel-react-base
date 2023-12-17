<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColUebaunitLocal extends Model
{
    use HasFactory;

    protected $table = 'col_uebaunit';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'ue_lc_unidadconstruccion',
        'ue_lc_construccion',
        'ue_lc_terreno',
        'baunit',
    ];

    public function predio()
    {
        return $this->belongsTo(LcPredioLocal::class, 'baunit', 't_id');
    }

    public function construccion()
    {
        return $this->belongsTo(LcConstruccionLocal::class, 'ue_lc_construccion', 't_id');
    }


    public function terreno()
    {
        return $this->belongsTo(LcTerrenoLocal::class, 'ue_lc_terreno', 't_id');
    }

    public function unidadConstruccion()
    {
        return $this->belongsTo(LcUnidadconstruccionLocal::class, 'ue_lc_unidadconstruccion', 't_id');
    }
}
