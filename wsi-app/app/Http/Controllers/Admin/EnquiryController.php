<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EnquiryController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Admin/Enquiries/Index', [
            'enquiries' => Enquiry::with('service')
                ->when($request->query('status'), fn ($q, $s) => $q->where('status', $s))
                ->latest()
                ->get(),
            'status' => $request->query('status') ?: 'all',
        ]);
    }

    public function updateStatus(Request $request, Enquiry $enquiry): RedirectResponse
    {
        $enquiry->update([
            'status' => $request->validate(['status' => ['required', 'in:new,contacted,closed']])['status'],
        ]);

        return back()->with('success', 'Status diperbarui.');
    }
}