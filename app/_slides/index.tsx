import DeckIsAnApp from './DeckIsAnApp'
import TitleSlide from './TitleSlide'
import McpArchitecture from './McpArchitecture'
import McpToolFlow from './McpToolFlow'
import McpCapabilities from './McpCapabilities'
import McpOverview from './McpOverview'
import PersonalSlide from './PersonalSlide'
import QuestionsSlide from './QuestionsSlide'
import UnknownAndUnanswered from './UnknownAndUnanswered'
import ThoughtsOnAIJobMarket from './WillAiTakeYourJob'
import StartSlide from './StartSlide'
import LinkToTalkSlide from './LinkToTalkSlide'
import DemoSlide from './DemoSlide'
import MinimalServerCode from './MinimalServerCode'
import { SlideId } from '@/types/SlideId'

type SlideContentComponent = React.FC

export const SLIDES: { Content: SlideContentComponent, id: string }[] = [
  // Current Slide
  { Content: StartSlide, id: SlideId.StartSlide },
  { Content: TitleSlide, id: SlideId.TitleSlide },
  { Content: PersonalSlide, id: SlideId.PersonalSlide },
  { Content: DeckIsAnApp, id: SlideId.DeckIsAnApp },
  { Content: McpOverview, id: SlideId.McPSectionIntroSlide },
  { Content: McpToolFlow, id: SlideId.McpToolFlow },
  { Content: McpArchitecture, id: SlideId.McpArchitecture },
  { Content: McpCapabilities, id: SlideId.McpCapabilities },
  { Content: UnknownAndUnanswered, id: SlideId.UnknownAndUnanswered },
  { Content: MinimalServerCode, id: SlideId.MinimalServerCode },
  { Content: DemoSlide, id: SlideId.DemoSlide },
  { Content: LinkToTalkSlide, id: SlideId.LinkToTalkSlide },
  { Content: ThoughtsOnAIJobMarket, id: SlideId.WillAiTakeYourJob },
  { Content: QuestionsSlide, id: SlideId.QuestionsSlide },
]

export const FADE_VARIANTS = {
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  initial: {
    opacity: 0,
  },
}
