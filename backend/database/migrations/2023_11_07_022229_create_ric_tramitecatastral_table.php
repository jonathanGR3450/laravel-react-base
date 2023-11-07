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
        Schema::create('ric_tramitecatastral', function (Blueprint $table) {
            $table->id('t_id');
            $table->bigInteger('clasificacion_mutacion')->nullable();
            $table->string('numero_resolucion', 30)->nullable();
            $table->date('fecha_resolucion')->nullable();
            $table->date('fecha_radicacion')->nullable();
            $table->bigInteger('ric_predio')->nullable();

            $table->foreign('ric_predio')->references('t_id')->on('ric_predio');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ric_tramitecatastral');
    }
};
