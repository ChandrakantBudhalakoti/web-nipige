export interface AuthorBio {
  name: string;
  role: string;
  bio: string;
}

const AUTHORS: Record<string, AuthorBio> = {
  "Nipige Team": {
    name: "Nipige Team",
    role: "Marketplace Platform Engineering",
    bio: "The Nipige team builds and operates production marketplace infrastructure - vendor onboarding, real-time dispatch, payments, and native apps - drawing on 13+ years of enterprise billing and monetization engineering at Trigital Technologies.",
  },
};

/** Falls back to a generic contributor bio for any author not in the roster. */
export function getAuthorBio(name: string): AuthorBio {
  return (
    AUTHORS[name] ?? {
      name,
      role: "Contributor",
      bio: `${name} writes for the Nipige blog on marketplace platforms and go-to-market strategy.`,
    }
  );
}
