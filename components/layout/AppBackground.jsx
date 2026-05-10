export function AppBackground({ children }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#fef3c7_0,#dbeafe_34%,#dcfce7_70%,#f8fafc_100%)] font-game text-slate-900">
      {children}
    </main>
  );
}
