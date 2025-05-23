<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PenyakitPadi extends Model
{
    use HasFactory;

    protected $table = 'penyakit_padi';

    protected $fillable = [
        'nama_penyakit',
        'deskripsi',
        'penyebab',
        'saran_penanganan',
    ];

    public function diagnosas()
    {
        return $this->hasMany(Diagnosis::class, 'penyakit_id');
    }
}
