export enum SlideId {
  TitleSlide = 'intro',
  PersonalSlide = 'personal',
  DeckIsAnApp = 'deck-is-an-app',
  AudienceOnboardingSlide = 'audience-onboarding',
  McPSectionIntroSlide = 'mcp-section-intro',
  McpToolFlow = 'mcp-tool-flow',
  McpArchitecture = 'mcp-architecture',
  McpCapabilities = 'mcp-capabilities',
  UnknownAndUnanswered = 'unknowns-and-unanswered-questions',
  WillAiTakeYourJob = 'thoughts-on-ai-job-market',
  QuestionsSlide = 'questions',
}

export const PRETTY_SLIDE_IDS = {
  [SlideId.TitleSlide]: 'Title Slide',
  [SlideId.PersonalSlide]: 'Hi, I\'m Riaz',
  [SlideId.DeckIsAnApp]: 'Deck Is An App',
  [SlideId.AudienceOnboardingSlide]: 'Get Onboarded',
  [SlideId.McPSectionIntroSlide]: 'MCP Overview',
  [SlideId.McpToolFlow]: 'MCP Tool Flow',
  [SlideId.McpArchitecture]: 'MCP Architecture',
  [SlideId.McpCapabilities]: 'MCP Capabilities',
  [SlideId.UnknownAndUnanswered]: 'Unknowns and Unanswered Questions',
  [SlideId.WillAiTakeYourJob]: 'Will AI Take Your Job?',
  [SlideId.QuestionsSlide]: 'Questions',
}
