import AudienceOnboardingSlide from './AudienceOnboardingSlide'
import DeckIsAnApp from './DeckIsAnApp'
import IntroSlide from './IntroSlide'
import McpArchitecture from './McpArchitecture'
import McpToolFlow from './McpToolFlow'
import McpCapabilities from './McpCapabilities'
import McPSectionIntroSlide from './McPSectionIntroSlide'
import PersonalSlide from './PersonalSlide'
import QuestionsSlide from './QuestionsSlide'
import ThingsThatDoNotWork from './ThingsThatDoNotWork'
import ThoughtsOnAIJobMarket from './ThoughtsOnAIJobMarket'

type SlideContentComponent = React.FC

export const SLIDES: { Content: SlideContentComponent, id: string }[] = [
  // Current Slide
  
  // Slides to build
  { Content: AudienceOnboardingSlide, id: 'slide4' },
  // Separation to ready slides
  { Content: IntroSlide, id: 'slide1' },
  { Content: PersonalSlide, id: 'slide2' },
  { Content: DeckIsAnApp, id: 'slide7' },
  { Content: McPSectionIntroSlide, id: 'slide7' },
  { Content: McpArchitecture, id: 'slide10' },
  { Content: McpToolFlow, id: 'slide11' },
  { Content: McpCapabilities, id: 'slide9' },
  { Content: ThingsThatDoNotWork, id: 'slide8' },
  { Content: ThoughtsOnAIJobMarket, id: 'slide5' },
  { Content: QuestionsSlide, id: 'slide6' },
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
