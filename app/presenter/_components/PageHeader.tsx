interface PageHeaderProps {
  title: string
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="text-center my-4">
      <h1 className="text-6xl font-black text-black drop-shadow-lg">{title}</h1>
    </div>
  )
} 
