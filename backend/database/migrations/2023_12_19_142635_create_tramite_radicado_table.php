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
        Schema::create('tramite_radicado', function (Blueprint $table) {
            $table->id('t_id');
            $table->string('radicado');
            $table->string('id');
            $table->string('tipo_tramite');
            $table->date('fecha_radicado');
            $table->string('tipo_predio');
            $table->string('numero_predial');
            $table->string('estado');
            $table->date('fecha_notificacion');
            $table->string('metodo_notificacion');
            $table->text('observaciones')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tramite_radicado');
    }
};
