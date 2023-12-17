<?php

namespace App\Models;

use App\Models\Local\RadicadosLocal;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TramiteTipo extends Model
{
    use HasFactory;

    protected $table = 'tramitetipo';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'descripcion',
    ];

    public function radicados(): HasMany {
        return $this->hasMany(RadicadosLocal::class, 'tramite_id', 'id');
    }

}
