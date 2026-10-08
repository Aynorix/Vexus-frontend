import { socialLinks } from '../../data/mockData'

/* Tiny, unobtrusive outbound links — footer-scale, never competing
   with the dashboard itself. */
export default function SocialLinks() {
  return (
    <nav className="dsocial" aria-label="VexusIQ elsewhere">
      {socialLinks.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
          {link.label}
        </a>
      ))}
    </nav>
  )
}
