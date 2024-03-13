interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="noise relative h-screen w-screen">
      <div className="flex size-full items-center justify-center">
        {children}
      </div>
    </div>
  )
}
