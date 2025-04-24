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
        Schema::create('diagnosis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('penyakit_id')
                ->nullable() // <-- memungkinkan null
                ->constrained('penyakit_padi')
                ->onDelete('cascade');
            $table->string('gambar_input');
            $table->string('hasil_diagnosis');
            $table->float('confidence');
            $table->enum('metode', ['galeri', 'kamera']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diagnosis');
    }
};
