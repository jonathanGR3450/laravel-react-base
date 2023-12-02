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
        Schema::table('col_miembros', function (Blueprint $table) {
            $table->dropForeign(['interesado_lc_interesado']);
            $table->unsignedBigInteger('interesado_lc_interesado')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('col_miembros', function (Blueprint $table) {
            $table->string('interesado_lc_interesado')->nullable(false)->change();
        });
    }
};
