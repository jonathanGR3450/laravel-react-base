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
        Schema::create('ric_predio', function (Blueprint $table) {
            $table->id('t_id');
            $table->date('fecha_inscripcion_catastral')->nullable();
            $table->bigInteger('zona')->nullable();
            $table->date('vigencia_actualizacion_catastral')->nullable();
            $table->bigInteger('estado')->nullable();
            $table->bigInteger('catastro')->nullable();
            $table->bigInteger('ric_gestorcatastral')->nullable();
            $table->bigInteger('ric_operadorcatastral')->nullable();
            $table->string('nombre', 255)->nullable();
            $table->timestamp('comienzo_vida_util_version')->nullable();
            $table->timestamp('fin_vida_util_version')->nullable();
            $table->string('espacio_de_nombres', 255)->nullable();
            $table->string('local_id', 255)->nullable();
            $table->bigInteger('lc_predio')->nullable();

            $table->foreign('lc_predio')->references('t_id')->on('lc_predio');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ric_predio');
    }
};
