export const metadata = {
  title: 'Tokyo Vegan Studio',
  description: 'Content management for Tokyo Vegan blog',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
