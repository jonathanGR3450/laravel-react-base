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
        Schema::create('lc_contactovisita', function (Blueprint $table) {
            $table->id('t_id');
            $table->uuid('t_ili_tid')->default(DB::raw('public.uuid_generate_v4()'));
            $table->bigInteger('tipo_documento_quien_atendio')->unsigned();
            $table->string('numero_documento_quien_atendio', 50);
            $table->string('primer_nombre_quien_atendio', 100);
            $table->string('segundo_nombre_quien_atendio', 100)->nullable();
            $table->string('primer_apellido_quien_atendio', 100);
            $table->string('segundo_apellido_quien_atendio', 100)->nullable();
            $table->string('domicilio_notificaciones', 255)->nullable();
            $table->string('celular', 20)->nullable();
            $table->string('correo_electronico', 100)->nullable();
            $table->boolean('autoriza_notificaciones');
            $table->bigInteger('lc_datos_adicionales')->unsigned();
            $table->foreign('lc_datos_adicionales')->references('t_id')->on('lc_datosadicionaleslevantamientocatastral');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_contactovisita');
    }
};
