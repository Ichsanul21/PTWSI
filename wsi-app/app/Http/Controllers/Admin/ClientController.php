<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Clients/Index', [
            'clients' => Client::orderBy('order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'website' => ['nullable', 'url', 'max:255'],
            'order' => ['nullable', 'integer'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('clients', 'public');
        }

        Client::create($data + ['is_published' => $request->boolean('is_published')]);

        return back()->with('success', 'Klien ditambahkan.');
    }

    public function update(Request $request, Client $client): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'website' => ['nullable', 'url', 'max:255'],
            'order' => ['nullable', 'integer'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        if ($request->hasFile('logo')) {
            if ($client->logo) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($client->logo);
            }
            $data['logo'] = $request->file('logo')->store('clients', 'public');
        }

        $data['is_published'] = $request->boolean('is_published');
        $client->update($data);

        return back()->with('success', 'Klien diperbarui.');
    }

    public function destroy(Client $client): RedirectResponse
    {
        if ($client->logo) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($client->logo);
        }
        $client->delete();

        return back()->with('success', 'Klien dihapus.');
    }
}