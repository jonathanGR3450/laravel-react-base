<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lc_fuenteadministrativa', function (Blueprint $table) {
            $table->id('t_id');
            $table->bigInteger('tipo')->unsigned();
            $table->string('ente_emisor', 255)->nullable();
            $table->string('observacion', 255)->nullable();
            $table->string('numero_fuente', 150)->nullable();
            $table->bigInteger('estado_disponibilidad')->unsigned();
            $table->bigInteger('tipo_principal')->unsigned()->nullable();
            $table->date('fecha_documento_fuente')->nullable();
            $table->string('espacio_de_nombres', 255);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_fuenteadministrativa');
    }
};
