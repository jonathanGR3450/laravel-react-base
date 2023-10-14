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
        Schema::create('lc_interesado', function (Blueprint $table) {
            $table->bigIncrements('t_id');
            $table->uuid('t_ili_tid')->default(DB::raw('public.uuid_generate_v4()'));
            $table->bigInteger('tipo')->unsigned();
            $table->bigInteger('tipo_documento')->unsigned();
            $table->string('documento_identidad', 50);
            $table->string('primer_nombre', 100)->nullable();
            $table->string('segundo_nombre', 100)->nullable();
            $table->string('primer_apellido', 100);
            $table->string('segundo_apellido', 100)->nullable();
            $table->bigInteger('sexo')->unsigned();
            $table->bigInteger('grupo_etnico')->unsigned();
            $table->string('razon_social', 255)->nullable();
            $table->bigInteger('estado_civil')->unsigned();
            $table->string('nombre', 255)->nullable();
            $table->timestamp('comienzo_vida_util_version');
            $table->timestamp('fin_vida_util_version')->nullable();
            $table->string('espacio_de_nombres', 255);
            $table->string('local_id', 255);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_interesado');
    }
};
