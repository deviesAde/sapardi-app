<?php

namespace App\Http\Controllers;

use App\Models\PenyakitPadi as Penyakit;
use Illuminate\Http\Request;

class PenyakitController extends Controller
{
    public function index()
    {
        $penyakit = Penyakit::all(); // Ambil semua data penyakit dari tabel `penyakit_padi`

        return inertia('kelolaPenyakit', [
            'penyakit' => $penyakit,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_penyakit' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'penyebab' => 'required|string',
            'saran_penanganan' => 'required|string',
        ]);

        Penyakit::create($request->all());

        return redirect()->back()->with('success', 'Penyakit berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_penyakit' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'penyebab' => 'required|string',
            'saran_penanganan' => 'required|string',
        ]);

        $penyakit = Penyakit::findOrFail($id);
        $penyakit->update($request->all());

        return redirect()->back()->with('success', 'Penyakit berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $penyakit = Penyakit::findOrFail($id);
        $penyakit->delete();

        return redirect()->back()->with('success', 'Penyakit berhasil dihapus.');
    }
}
