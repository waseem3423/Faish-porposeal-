export interface ReasonItem {
  id: string;
  title: string;
  description: string;
  urduSubtitle?: string;
  iconName: string;
  tag: string;
}

export interface MilestoneItem {
  id: string;
  chapter: string;
  title: string;
  dateOrMoment: string;
  story: string;
  quote: string;
  iconName: string;
}

export interface ShayariItem {
  id: string;
  urduText: string;
  romanUrdu: string;
  englishMeaning: string;
  poet?: string;
  theme: string;
}

export interface CustomLoveData {
  proposerName: string;
  belovedName: string;
  letterTitle: string;
  letterBody: string;
  proposalQuestion: string;
  customMemories: { id: string; title: string; image?: string; caption: string }[];
  acceptedDate?: string;
}
