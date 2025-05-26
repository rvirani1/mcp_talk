import Image from 'next/image'
import PageHeader from '@/app/_components/PageHeader'
import DemoImage from '@/app/_images/demo.png'

export default function DemoSlide() {
  return <div>
    <PageHeader title="Demo Anyone?" />
    <Image src={DemoImage} alt="Demo Image" width={400} height={400} className="rounded-xl" />
  </div>
}
