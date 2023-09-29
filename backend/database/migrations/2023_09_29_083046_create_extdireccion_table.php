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
        Schema::create('extdireccion', function (Blueprint $table) {
            $table->id('t_id');
            $table->bigInteger('t_seq')->nullable();
            $table->bigInteger('tipo_direccion');
            $table->boolean('es_direccion_principal');
            // $table->geometry('localizacion', 'POINTZ', 9377)->nullable();
            $table->string('codigo_postal', 255)->nullable();
            $table->bigInteger('clase_via_principal')->nullable();
            $table->string('valor_via_principal', 100)->nullable();
            $table->string('letra_via_principal', 20)->nullable();
            $table->bigInteger('sector_ciudad')->nullable();
            $table->string('valor_via_generadora', 100)->nullable();
            $table->string('letra_via_generadora', 20)->nullable();
            $table->string('numero_predio', 20)->nullable();
            $table->bigInteger('sector_predio')->nullable();
            $table->string('complemento', 255)->nullable();
            $table->string('nombre_predio', 255)->nullable();
            $table->bigInteger('extunidadedificcnfsica_ext_direccion_id')->nullable();
            $table->bigInteger('extinteresado_ext_direccion_id')->nullable();
            $table->bigInteger('lc_construccion_ext_direccion_id')->nullable();
            $table->bigInteger('lc_nu_spcjrdcrdsrvcios_ext_direccion_id')->nullable();
            $table->bigInteger('lc_n_spcjrdcndddfccion_ext_direccion_id')->nullable();
            $table->bigInteger('lc_terreno_ext_direccion_id')->nullable();
            $table->bigInteger('lc_unidadconstruccion_ext_direccion_id')->nullable();
            $table->bigInteger('lc_predio_direccion')->nullable();
            $table->bigInteger('lc_servidumbretransito_ext_direccion_id')->nullable();

            $table->unsignedBigInteger('lc_numeros_prediales_id')->unique();
            $table->foreign('lc_numeros_prediales_id')->references('t_id')->on('lc_numeros_prediales')->onDelete('cascade');
        });

        DB::statement('ALTER TABLE extdireccion ADD COLUMN localizacion geometry(pointz, 9377)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('extdireccion');
    }
};
