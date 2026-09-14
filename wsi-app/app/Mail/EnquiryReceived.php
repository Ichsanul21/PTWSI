<?php

namespace App\Mail;

use App\Models\Enquiry;
use App\Models\Service;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EnquiryReceived extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Enquiry $enquiry)
    {
        //
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Enquiry Baru: '.$this->enquiry->name,
            from: new Address(config('mail.from.address'), config('mail.from.name')),
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.enquiry-received',
            with: [
                'name' => $this->enquiry->name,
                'company' => $this->enquiry->company,
                'email' => $this->enquiry->email,
                'phone' => $this->enquiry->phone,
                'service' => optional(Service::find($this->enquiry->service_id))->name_id,
                'message' => $this->enquiry->message,
                'locale' => $this->enquiry->locale,
                'created' => $this->enquiry->created_at?->format('d M Y H:i'),
            ],
        );
    }
}