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
        Schema::create('lc_derecho', function (Blueprint $table) {
            $table->id('t_id');
            $table->bigInteger('tipo')->unsigned();
            $table->decimal('fraccion_derecho', 11, 10);
            $table->date('fecha_inicio_tenencia')->nullable();
            $table->string('descripcion', 255)->nullable();
            $table->bigInteger('interesado_lc_interesado')->unsigned();
            $table->bigInteger('interesado_lc_agrupacioninteresados')->unsigned()->nullable();
            $table->bigInteger('unidad')->unsigned()->nullable();
            $table->timestamp('comienzo_vida_util_version')->nullable();
            $table->timestamp('fin_vida_util_version')->nullable();
            $table->string('espacio_de_nombres', 255);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_derecho');
    }
};
