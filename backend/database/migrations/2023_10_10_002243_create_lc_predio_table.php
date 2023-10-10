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
        Schema::create('lc_predio', function (Blueprint $table) {
            $table->id('t_id');
            $table->uuid('t_ili_tid')->default(DB::raw('uuid_generate_v4()'));
            $table->string('departamento', 2)->notNull();
            $table->string('municipio', 3)->notNull();
            $table->string('id_operacion', 30)->notNull();
            $table->boolean('tiene_fmi')->notNull();
            $table->string('codigo_orip', 3)->nullable();
            $table->string('matricula_inmobiliaria', 80)->nullable();
            $table->string('numero_predial', 30)->nullable();
            $table->string('numero_predial_anterior', 20)->nullable();
            $table->string('codigo_homologado', 11)->nullable();
            $table->boolean('interrelacionado')->notNull();
            $table->boolean('codigo_homologado_fmi')->notNull();
            $table->string('nupre', 11)->nullable();
            $table->decimal('avaluo_catastral', 16, 1)->default(0.0);
            $table->decimal('valor_referencia', 16, 1)->default(0.0);
            $table->bigInteger('tipo')->notNull();
            $table->bigInteger('condicion_predio')->notNull();
            $table->bigInteger('destinacion_economica')->notNull();
            $table->bigInteger('clase_suelo')->notNull();
            $table->bigInteger('categoria_suelo')->nullable();
            $table->string('nombre', 255)->nullable();
            $table->timestamp('comienzo_vida_util_version')->notNull();
            $table->timestamp('fin_vida_util_version')->nullable();
            $table->string('espacio_de_nombres', 255)->notNull();
            $table->string('local_id', 255)->notNull();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_predio');
    }
};
