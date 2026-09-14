<?php

namespace App\Http\Controllers;

use App\Mail\EnquiryReceived;
use App\Models\Enquiry;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EnquiryController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        if ($request->filled('website')) {
            return back()->with('success', true);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'company' => ['nullable', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160'],
            'phone' => ['nullable', 'string', 'max:30'],
            'service_id' => ['nullable', 'exists:services,id'],
            'message' => ['nullable', 'string', 'max:3000'],
        ]);

        $enquiry = Enquiry::create($validated + ['locale' => app()->getLocale()]);

        try {
            Mail::to(Setting::get('brand', [])['email'] ?? config('mail.from.address'))
                ->send(new EnquiryReceived($enquiry));
        } catch (\Throwable $e) {
            report($e);
        }

        return back()->with('success', true);
    }
}