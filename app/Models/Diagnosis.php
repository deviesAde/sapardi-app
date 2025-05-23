<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Diagnosis extends Model
{
    protected $table = 'diagnosis';
    protected $fillable = [
        'user_id',
        'penyakit_id',
        'gambar_input',
        'hasil_diagnosis',
        'confidence',
        'metode',
    ];

    public function penyakit()
    {
        return $this->belongsTo(PenyakitPadi::class, 'penyakit_id');
    }
}
