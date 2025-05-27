import Image from 'next/image'
import QrCodeGithub from '@/app/_images/qrcode_github.png'
import PageHeader from '@/app/_components/PageHeader'

export default function LinkToTalkSlide() {
  return <div>
    <PageHeader title="Open an Issue!" />
    <div className="flex flex-col items-center justify-center gap-8">
      <Image src={QrCodeGithub} alt="Qr Code Github Source" width={400} height={400} className="rounded-xl" />
      <p className="text-4xl text-center">github.com/rvirani1/mcp-talk</p>
    </div>
  </div>
}
