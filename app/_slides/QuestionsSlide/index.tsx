import Image from 'next/image'
import QrCodeDreamsnCodes from './qrcode_dreamsn_codes.png'

export default function QuestionsSlide() {
  return <div>
    <h1>Questions</h1>
    <div className="flex flex-col items-center justify-center">
      <Image src={QrCodeDreamsnCodes} alt="Qr Code Dreamsn Codes" width={200} height={200} />
      <p className="text-2xl">Dreamsn Codes</p>
    </div>
  </div>
}
