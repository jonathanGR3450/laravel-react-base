<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RicPredioTramiteCatastralLocal extends Model
{
    use HasFactory;

    protected $table = 'ric_predio_tramitecatastral';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'ric_tramite_catastral',
        'ric_predio',
    ];

    public function ricTramiteCatrastral()
    {
        return $this->belongsTo(RicTramiteCatastralLocal::class, 'ric_tramite_catastral', 't_id');
    }

    public function ricPredio()
    {
        return $this->belongsTo(RicPredioLocal::class, 'ric_predio', 't_id');
    }
}
