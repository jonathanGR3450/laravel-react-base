<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lc_restriccion', function (Blueprint $table) {
            $table->id('t_id');
            $table->bigInteger('tipo')->nullable();
            $table->string('descripcion', 255)->nullable();
            $table->bigInteger('interesado_lc_interesado')->nullable();
            $table->bigInteger('interesado_lc_agrupacioninteresados')->nullable();
            $table->bigInteger('unidad')->nullable();
            $table->timestamp('comienzo_vida_util_version')->nullable(false);
            $table->timestamp('fin_vida_util_version')->nullable();
            $table->string('espacio_de_nombres', 255)->nullable(false);
            $table->string('local_id', 255)->nullable(false);

            $table->foreign('interesado_lc_agrupacioninteresados')->references('t_id')->on('lc_agrupacioninteresados')->deferrable()->initiallyDeferred();
            $table->foreign('interesado_lc_interesado')->references('t_id')->on('lc_interesado')->deferrable()->initiallyDeferred();
            $table->foreign('unidad')->references('t_id')->on('lc_predio')->deferrable()->initiallyDeferred();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_restriccion');
    }
};
