import {
  BookmarkFilledIcon,
  BookmarkIcon,
  Cross2Icon,
  Crosshair1Icon,
  DotsHorizontalIcon,
  EnvelopeClosedIcon,
  ExitIcon,
  GearIcon,
  MixerHorizontalIcon,
  MixIcon,
  MoonIcon,
  PieChartIcon,
  PlusIcon,
  RocketIcon,
  RowsIcon,
  SectionIcon,
  Share1Icon,
  StackIcon,
  SunIcon,
  TableIcon,
  ViewGridIcon,
  ViewHorizontalIcon,
  ViewVerticalIcon,
} from '@radix-ui/react-icons'
import { Layers, LibrarySquare, Tag } from 'lucide-react'

import { cn } from '@/lib/utils'

const IconName = {
  moon: MoonIcon,
  sun: SunIcon,
  inbox: EnvelopeClosedIcon,
  focus: Crosshair1Icon,
  rows: RowsIcon,
  dots: DotsHorizontalIcon,
  section: SectionIcon,
  table: TableIcon,
  tag: Tag,
  bookmark: BookmarkIcon,
  'bookmark-filled': BookmarkFilledIcon,
  stack: StackIcon,
  layers: Layers,
  preferences: MixerHorizontalIcon,
  plus: PlusIcon,
  close: Cross2Icon,
  // app icons
  space: RocketIcon,
  lib: LibrarySquare,
  tree: Share1Icon,
  cti: PieChartIcon,
  'app-view': Layers,
  'component-type': MixIcon,
  logout: ExitIcon,
  settings: GearIcon,
  // view icons
  'view-grid': ViewGridIcon,
  'view-horizontal': ViewHorizontalIcon,
  'view-vertical': ViewVerticalIcon,
} as const

export type IconNameValue = keyof typeof IconName

export interface IconProps {
  name: IconNameValue
  className?: string
}

export const Icon = ({ name, className, ...props }: IconProps) => {
  const Comp = IconName[name]
  return <Comp className={cn('', className)} {...props} />
}
