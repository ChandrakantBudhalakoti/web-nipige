import { LogoMark } from "@/components/ui/Logo";
import { getAuthorBio } from "@/lib/data/authors";

export function WriterBio({ author }: { author: string }) {
  const bio = getAuthorBio(author);

  return (
    <div className="writer-bio">
      <div className="writer-bio-avatar">
        <LogoMark size={26} />
      </div>
      <div className="writer-bio-content">
        <div className="writer-bio-name">{bio.name}</div>
        <div className="writer-bio-role">{bio.role}</div>
        <p className="writer-bio-text">{bio.bio}</p>
      </div>
    </div>
  );
}
