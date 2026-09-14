<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Projects/Index', [
            'projects' => Project::with('client')->orderByDesc('id')->get(),
            'clients' => Client::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Projects/Form', [
            'project' => null,
            'clients' => Client::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        if ($request->hasFile('cover')) {
            $data['cover'] = $request->file('cover')->store('projects', 'public');
        }

        Project::create($data);

        return redirect()->route('admin.projects.index')->with('success', 'Proyek ditambahkan.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('Admin/Projects/Form', [
            'project' => $project->load('client:id,name'),
            'clients' => Client::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $data = $this->validated($request);

        if ($request->hasFile('cover')) {
            if ($project->cover) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($project->cover);
            }
            $data['cover'] = $request->file('cover')->store('projects', 'public');
        }

        $project->update($data);

        return redirect()->route('admin.projects.index')->with('success', 'Proyek diperbarui.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Proyek dihapus.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'name_id' => ['required', 'string', 'max:255'],
            'name_en' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:80'],
            'location_id' => ['nullable', 'string', 'max:255'],
            'location_en' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'string', 'max:20'],
            'client_id' => ['nullable', 'exists:clients,id'],
            'client_name' => ['nullable', 'string', 'max:255'],
            'summary_id' => ['nullable', 'string'],
            'summary_en' => ['nullable', 'string'],
            'highlights' => ['nullable', 'string'],
            'is_featured' => ['nullable', 'boolean'],
            'is_published' => ['nullable', 'boolean'],
            'cover' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        $data['slug'] = $request->input('slug') ?: Str::slug($data['name_id']).'-'.Str::random(4);
        $data['is_published'] = $request->boolean('is_published');
        $data['is_featured'] = $request->boolean('is_featured');
        $data['highlights'] = collect(explode("\n", $data['highlights'] ?? ''))->filter()->values()->all() ?: null;
        $data['client_id'] = $data['client_id'] ?: null;
        $data['client_name'] = $data['client_name'] ?: null;

        return $data;
    }
}