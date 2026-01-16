import Link from 'next/link';

const links = [
    {href: "/", label: "Accueil"},
    {href: "/prestations", label: "Prestations"},
    {href: "/rendez-vous", label: "Rendez-vous"},
    {href: "/contact", label: "Contact"},
]

export default function Header() {
    return (
        <header className="App-header">
            <nav className="flex gap-4 text-sm">
                {links.map((l) => (
                <Link
                key={l.href}
                href={l.href}
                className="hover:underline underline-offset-4">
                    {l.label}
                </Link>
                    ))}
            </nav>
        </header>
    )
}