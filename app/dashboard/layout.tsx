export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: "250px",
          background: "#111827",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>AI Sales CRM</h2>

        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/dashboard/leads">Leads</a></li>
          <li><a href="/dashboard/meetings">Meetings</a></li>
          <li><a href="/dashboard/emails">Emails</a></li>
          <li><a href="/dashboard/analytics">Analytics</a></li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: "30px" }}>
        {children}
      </main>
    </div>
  );
}