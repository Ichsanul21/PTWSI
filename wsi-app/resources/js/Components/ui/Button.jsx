import { Link } from '@inertiajs/react'

const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-500 focus-visible:ring-brand-500',
    secondary: 'bg-ink/5 text-ink hover:bg-ink/10 focus-visible:ring-ink/20',
    glass: 'border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus-visible:ring-white/50',
    light: 'bg-cream text-ink hover:bg-white focus-visible:ring-white',
    underline:
        'bg-transparent text-ink underline decoration-ink/30 underline-offset-8 hover:decoration-ink focus-visible:ring-ink/20',
}

const sizes = {
    none: 'px-0 py-1 text-[13px]',
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-[13px]',
    lg: 'px-8 py-4 text-sm',
}

export default function Button({
    as = 'link',
    href = '#',
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    external = false,
    block = false,
    ...rest
}) {
    const classes = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-mono font-medium uppercase leading-none tracking-[0.04em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.98] ${block ? 'w-full' : ''} ${variants[variant]} ${sizes[size]} ${className}`

    if (as === 'button') {
        return (
            <button className={classes} {...rest}>
                {children}
            </button>
        )
    }

    if (external) {
        return (
            <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
                {children}
            </a>
        )
    }

    return (
        <Link href={href} className={classes} {...rest}>
            {children}
        </Link>
    )
}
