/** 40–60 word direct answer under a question heading (featured-snippet style). */
export function AnswerCapsule({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 15,
        color: "var(--w)",
        lineHeight: 1.7,
        marginTop: 8,
        marginBottom: 16,
        maxWidth: 720,
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
      }}
    >
      {children}
    </p>
  );
}
