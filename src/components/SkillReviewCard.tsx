import { MessageSquare, Star, ThumbsUp } from "lucide-react";
import type { Review } from "@/types/review";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} 星评分`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={index < rating ? "h-3.5 w-3.5 fill-caution text-caution" : "h-3.5 w-3.5 text-zinc-700"}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export function SkillReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-lg border border-line bg-panel p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-medium text-white">{review.userName}</p>
          <p className="mt-1 text-xs text-zinc-500">{review.useCase}</p>
        </div>
        <Stars rating={review.rating} />
      </div>

      <p className="mt-4 text-sm leading-6 text-zinc-300">{review.comment}</p>

      <div className="mt-4 grid gap-2 text-xs text-zinc-400 sm:grid-cols-4">
        <span>输出 {review.outputQuality}/5</span>
        <span>证据 {review.evidenceQuality}/5</span>
        <span>风险 {review.riskWarning}/5</span>
        <span>复盘 {review.replayValue}/5</span>
      </div>

      {review.creatorReply ? (
        <div className="mt-4 rounded-md border border-white/10 bg-white/5 p-3 text-xs leading-5 text-zinc-300">
          <span className="inline-flex items-center gap-1 font-medium text-signal">
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
            创作者回复
          </span>
          <p className="mt-1">{review.creatorReply}</p>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
        {review.isVerifiedPurchase ? <span className="text-signal">已运行用户</span> : <span>公开体验用户</span>}
        <span className="inline-flex items-center gap-1">
          <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" />
          {review.helpfulCount} 人觉得有帮助
        </span>
        <span>{review.createdAt}</span>
      </div>
    </article>
  );
}
