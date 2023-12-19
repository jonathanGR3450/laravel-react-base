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
        Schema::table('col_uebaunit', function (Blueprint $table) {
            $table->string('ue_lc_unidadconstruccion_conservacion')->nullable();
            $table->string('ue_lc_construccion_conservacion')->nullable();
            $table->string('ue_lc_terreno_conservacion')->nullable();
            $table->string('baunit_conservacion')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('col_uebaunit', function (Blueprint $table) {
            $table->dropColumn('ue_lc_unidadconstruccion_conservacion');
            $table->dropColumn('ue_lc_construccion_conservacion');
            $table->dropColumn('ue_lc_terreno_conservacion');
            $table->dropColumn('baunit_conservacion');
        });
    }
};
