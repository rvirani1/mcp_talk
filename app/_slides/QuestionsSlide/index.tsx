import Image from 'next/image'
import QrCodeDreamsnCodes from './qrcode_dreamsn_codes.png'
import PageHeader from '@/app/_components/PageHeader'

export default function QuestionsSlide() {
  return <div>
    <PageHeader title="Questions?" />
    <div className="flex items-center justify-center gap-8">
      <div>
        <Image src={QrCodeDreamsnCodes} alt="Qr Code Dreamsn Codes" width={400} height={400} className="rounded-xl" />
        <p className="text-2xl text-center">My (Teeny) Site</p>
      </div>
    </div>
  </div>
}
