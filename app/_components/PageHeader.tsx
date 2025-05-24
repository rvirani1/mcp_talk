interface PageHeaderProps {
  title: string
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-6xl font-black mb-12 text-black drop-shadow-lg">{title}</h1>
    </div>
  )
} 