<x-mail::message>
# Enquiry baru dari website

**{{ $name }}**
@if($company)Perusahaan: {{ $company }}@endif
Email: {{ $email }}
@if($phone)Telepon: {{ $phone }}@endif
@if($service)Layanan: {{ $service }}@endif
Bahasa: {{ strtoupper($locale ?? 'id') }}
Diterima: {{ $created }}

**Pesan:**
{{ $message }}

Kelola enquiry di panel admin: {{ url('/admin/enquiries') }}
</x-mail::message>