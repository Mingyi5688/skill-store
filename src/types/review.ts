export interface Review {
  id: string;
  userId: string;
  userName: string;
  skillId: string;
  rating: number;
  outputQuality: number;
  evidenceQuality: number;
  riskWarning: number;
  easeOfUse: number;
  replayValue: number;
  comment: string;
  useCase: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  creatorReply?: string;
  createdAt: string;
}
