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
        Schema::create('lc_datosadicionaleslevantamientocatastral', function (Blueprint $table) {
            $table->bigIncrements('t_id');
            $table->uuid('t_ili_tid')->default(DB::raw('public.uuid_generate_v4()'));
            $table->boolean('tiene_area_registral')->default(false);
            $table->decimal('area_registral_m2', 25, 2)->default(0);
            $table->bigInteger('procedimiento_catastral_registral')->default(0);
            $table->string('observaciones', 500)->nullable();
            $table->date('fecha_visita_predial');
            $table->bigInteger('tipo_documento_reconocedor')->default(0);
            $table->string('numero_documento_reconocedor', 50);
            $table->string('primer_nombre_reconocedor', 100);
            $table->string('segundo_nombre_reconocedor', 100)->nullable();
            $table->string('primer_apellido_reconocedor', 100);
            $table->string('segundo_apellido_reconocedor', 100)->nullable();
            $table->bigInteger('resultado_visita')->default(0);
            $table->string('otro_cual_resultado_visita', 255)->nullable();
            $table->boolean('suscribe_acta_colindancia')->default(false);
            $table->boolean('despojo_abandono')->default(false);
            $table->bigInteger('estrato')->default(0);
            $table->string('otro_cual_estrato', 255)->nullable();
            $table->bigInteger('lc_predio');
            $table->foreign('lc_predio')
                ->references('t_id')
                ->on('lc_predio')
                ->deferrable()
                ->initiallyDeferred();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_datosadicionaleslevantamientocatastral');
    }
};
