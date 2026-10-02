import { DaysCard } from '@/components/cards/days-card'
import { LetterCard } from '@/components/cards/letter-card'
import { PhotoCard } from '@/components/cards/photo-card'
import { PlayerCard } from '@/components/cards/player-card'
import { ScratchCard } from '@/components/cards/scratch-card'
import { LoveCard, SocialCard, SweetWordsCard } from '@/components/cards/small-cards'
import {
  ClosingCard,
  FavoritesCard,
  JokeCard,
  MomentCard,
  QueenCard,
  SpecialCard,
  StoryCard,
  SurpriseCard,
  WishCard,
} from '@/components/cards/text-cards'
import { TimelineCard } from '@/components/cards/timeline-card'

const W2 = 'col-span-2'
const PHOTO = 'col-span-2 lg:row-span-2 max-sm:hidden'
const TALL = 'col-span-2 lg:row-span-2'

// Desktop: 4 kolom x 10 baris + penutup. Mobile: 2 kolom, foto pindah ke carousel.
export function BentoGrid() {
  let i = 0
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[minmax(170px,auto)] lg:grid-flow-dense lg:grid-cols-4">
      <PhotoCard photoIndex={0} index={i++} className={PHOTO} />
      <QueenCard index={i++} />
      <SpecialCard index={i++} />
      <DaysCard index={i++} />
      <SurpriseCard index={i++} />

      <FavoritesCard index={i++} className={W2} />
      <JokeCard index={i++} />
      <SweetWordsCard index={i++} />

      <PlayerCard index={i++} className={`${W2} scroll-mt-24`} />
      <PhotoCard photoIndex={1} index={i++} className={PHOTO} />
      <MomentCard index={i++} className={W2} />

      <TimelineCard index={i++} className={`${TALL} scroll-mt-24`} />
      <PhotoCard photoIndex={2} index={i++} className={PHOTO} />

      <StoryCard index={i++} className={W2} />
      <LetterCard index={i++} className={W2} />

      <ScratchCard index={i++} className={W2} />
      <WishCard index={i++} />
      <LoveCard index={i++} />

      <SocialCard kind="instagram" index={i++} className={W2} />
      <SocialCard kind="tiktok" index={i++} className={W2} />

      <ClosingCard index={i++} className="col-span-2 lg:col-span-4" />
    </div>
  )
}
