import type { ComponentType } from "react";
import type { IconProps } from "./types/IconProps.js";
import { PlusIcon } from "./components/PlusIcon.js";
import { MinusIcon } from "./components/MinusIcon.js";
import { CheckIcon } from "./components/CheckIcon.js";
import { CloseIcon } from "./components/CloseIcon.js";
import { PencilIcon } from "./components/PencilIcon.js";
import { TrashIcon } from "./components/TrashIcon.js";
import { CopyIcon } from "./components/CopyIcon.js";
import { DownloadIcon } from "./components/DownloadIcon.js";
import { UploadIcon } from "./components/UploadIcon.js";
import { SaveIcon } from "./components/SaveIcon.js";
import { ShareIcon } from "./components/ShareIcon.js";
import { RefreshIcon } from "./components/RefreshIcon.js";
import { SearchIcon } from "./components/SearchIcon.js";
import { FilterIcon } from "./components/FilterIcon.js";
import { SlidersHorizontalIcon } from "./components/SlidersHorizontalIcon.js";
import { EllipsisIcon } from "./components/EllipsisIcon.js";
import { EllipsisVerticalIcon } from "./components/EllipsisVerticalIcon.js";
import { ExternalLinkIcon } from "./components/ExternalLinkIcon.js";
import { LinkIcon } from "./components/LinkIcon.js";
import { UnlinkIcon } from "./components/UnlinkIcon.js";
import { ArrowUpIcon } from "./components/ArrowUpIcon.js";
import { ArrowDownIcon } from "./components/ArrowDownIcon.js";
import { ArrowLeftIcon } from "./components/ArrowLeftIcon.js";
import { ArrowRightIcon } from "./components/ArrowRightIcon.js";
import { ChevronUpIcon } from "./components/ChevronUpIcon.js";
import { ChevronDownIcon } from "./components/ChevronDownIcon.js";
import { ChevronLeftIcon } from "./components/ChevronLeftIcon.js";
import { ChevronRightIcon } from "./components/ChevronRightIcon.js";
import { ChevronsLeftIcon } from "./components/ChevronsLeftIcon.js";
import { ChevronsRightIcon } from "./components/ChevronsRightIcon.js";
import { MenuIcon } from "./components/MenuIcon.js";
import { HomeIcon } from "./components/HomeIcon.js";
import { PanelLeftIcon } from "./components/PanelLeftIcon.js";
import { LogInIcon } from "./components/LogInIcon.js";
import { LogOutIcon } from "./components/LogOutIcon.js";
import { MaximizeIcon } from "./components/MaximizeIcon.js";
import { InfoIcon } from "./components/InfoIcon.js";
import { CircleHelpIcon } from "./components/CircleHelpIcon.js";
import { CircleAlertIcon } from "./components/CircleAlertIcon.js";
import { TriangleAlertIcon } from "./components/TriangleAlertIcon.js";
import { CircleCheckIcon } from "./components/CircleCheckIcon.js";
import { CircleXIcon } from "./components/CircleXIcon.js";
import { BadgeCheckIcon } from "./components/BadgeCheckIcon.js";
import { BanIcon } from "./components/BanIcon.js";
import { LoaderIcon } from "./components/LoaderIcon.js";
import { EyeIcon } from "./components/EyeIcon.js";
import { EyeOffIcon } from "./components/EyeOffIcon.js";
import { LockIcon } from "./components/LockIcon.js";
import { UnlockIcon } from "./components/UnlockIcon.js";
import { ShieldIcon } from "./components/ShieldIcon.js";
import { ShieldCheckIcon } from "./components/ShieldCheckIcon.js";
import { BellIcon } from "./components/BellIcon.js";
import { BellOffIcon } from "./components/BellOffIcon.js";
import { FileIcon } from "./components/FileIcon.js";
import { FileTextIcon } from "./components/FileTextIcon.js";
import { FilesIcon } from "./components/FilesIcon.js";
import { FolderIcon } from "./components/FolderIcon.js";
import { FolderOpenIcon } from "./components/FolderOpenIcon.js";
import { ImageIcon } from "./components/ImageIcon.js";
import { ImagesIcon } from "./components/ImagesIcon.js";
import { PaperclipIcon } from "./components/PaperclipIcon.js";
import { ClipboardIcon } from "./components/ClipboardIcon.js";
import { ClipboardCheckIcon } from "./components/ClipboardCheckIcon.js";
import { BookOpenIcon } from "./components/BookOpenIcon.js";
import { BookmarkIcon } from "./components/BookmarkIcon.js";
import { TagIcon } from "./components/TagIcon.js";
import { ArchiveIcon } from "./components/ArchiveIcon.js";
import { InboxIcon } from "./components/InboxIcon.js";
import { CalendarIcon } from "./components/CalendarIcon.js";
import { ClockIcon } from "./components/ClockIcon.js";
import { HistoryIcon } from "./components/HistoryIcon.js";
import { UserIcon } from "./components/UserIcon.js";
import { UsersIcon } from "./components/UsersIcon.js";
import { UserPlusIcon } from "./components/UserPlusIcon.js";
import { UserMinusIcon } from "./components/UserMinusIcon.js";
import { MailIcon } from "./components/MailIcon.js";
import { SendIcon } from "./components/SendIcon.js";
import { MessageCircleIcon } from "./components/MessageCircleIcon.js";
import { MessagesSquareIcon } from "./components/MessagesSquareIcon.js";
import { PhoneIcon } from "./components/PhoneIcon.js";
import { VideoIcon } from "./components/VideoIcon.js";
import { MicIcon } from "./components/MicIcon.js";
import { MicOffIcon } from "./components/MicOffIcon.js";
import { AtSignIcon } from "./components/AtSignIcon.js";
import { ContactIcon } from "./components/ContactIcon.js";
import { GlobeIcon } from "./components/GlobeIcon.js";
import { MapPinIcon } from "./components/MapPinIcon.js";
import { ShoppingCartIcon } from "./components/ShoppingCartIcon.js";
import { CreditCardIcon } from "./components/CreditCardIcon.js";
import { WalletCardsIcon } from "./components/WalletCardsIcon.js";
import { ReceiptIcon } from "./components/ReceiptIcon.js";
import { BadgeDollarSignIcon } from "./components/BadgeDollarSignIcon.js";
import { DollarSignIcon } from "./components/DollarSignIcon.js";
import { TrendingUpIcon } from "./components/TrendingUpIcon.js";
import { TrendingDownIcon } from "./components/TrendingDownIcon.js";
import { ChartBarIcon } from "./components/ChartBarIcon.js";
import { ChartPieIcon } from "./components/ChartPieIcon.js";
import { DatabaseIcon } from "./components/DatabaseIcon.js";
import { TableIcon } from "./components/TableIcon.js";
import { ListIcon } from "./components/ListIcon.js";
import { GridIcon } from "./components/GridIcon.js";
import { PackageIcon } from "./components/PackageIcon.js";
import { TruckIcon } from "./components/TruckIcon.js";
import { SettingsIcon } from "./components/SettingsIcon.js";
import { MonitorIcon } from "./components/MonitorIcon.js";
import { SmartphoneIcon } from "./components/SmartphoneIcon.js";
import { WifiIcon } from "./components/WifiIcon.js";
import { WifiOffIcon } from "./components/WifiOffIcon.js";
import { CloudIcon } from "./components/CloudIcon.js";
import { PlayIcon } from "./components/PlayIcon.js";
import { PauseIcon } from "./components/PauseIcon.js";
import { Volume2Icon } from "./components/Volume2Icon.js";
import { VolumeXIcon } from "./components/VolumeXIcon.js";
import { SunIcon } from "./components/SunIcon.js";
import { MoonIcon } from "./components/MoonIcon.js";
import { PaletteIcon } from "./components/PaletteIcon.js";
import { ZapIcon } from "./components/ZapIcon.js";
import { GitHubIcon } from "./components/GitHubIcon.js";
import { DevpostIcon } from "./components/DevpostIcon.js";
import { LinkedInIcon } from "./components/LinkedInIcon.js";

export type IconCatalogItem = {
  name: string;
  category: string;
  keywords: readonly string[];
  icon: ComponentType<IconProps>;
};

export const iconCatalog = [
  { name: "PlusIcon", category: "Actions", keywords: ["add","create"], icon: PlusIcon },
  { name: "MinusIcon", category: "Actions", keywords: ["subtract","remove"], icon: MinusIcon },
  { name: "CheckIcon", category: "Actions", keywords: ["confirm","done"], icon: CheckIcon },
  { name: "CloseIcon", category: "Actions", keywords: ["dismiss","cancel"], icon: CloseIcon },
  { name: "PencilIcon", category: "Actions", keywords: ["edit","write"], icon: PencilIcon },
  { name: "TrashIcon", category: "Actions", keywords: ["delete","remove"], icon: TrashIcon },
  { name: "CopyIcon", category: "Actions", keywords: ["duplicate","clipboard"], icon: CopyIcon },
  { name: "DownloadIcon", category: "Actions", keywords: ["save","export"], icon: DownloadIcon },
  { name: "UploadIcon", category: "Actions", keywords: ["import","publish"], icon: UploadIcon },
  { name: "SaveIcon", category: "Actions", keywords: ["disk","store"], icon: SaveIcon },
  { name: "ShareIcon", category: "Actions", keywords: ["send","distribute"], icon: ShareIcon },
  { name: "RefreshIcon", category: "Actions", keywords: ["reload","sync"], icon: RefreshIcon },
  { name: "SearchIcon", category: "Actions", keywords: ["find","magnify"], icon: SearchIcon },
  { name: "FilterIcon", category: "Actions", keywords: ["filter","refine"], icon: FilterIcon },
  { name: "SlidersHorizontalIcon", category: "Actions", keywords: ["adjust","controls"], icon: SlidersHorizontalIcon },
  { name: "EllipsisIcon", category: "Actions", keywords: ["more","overflow"], icon: EllipsisIcon },
  { name: "EllipsisVerticalIcon", category: "Actions", keywords: ["more","overflow","menu"], icon: EllipsisVerticalIcon },
  { name: "ExternalLinkIcon", category: "Actions", keywords: ["open","launch"], icon: ExternalLinkIcon },
  { name: "LinkIcon", category: "Actions", keywords: ["url","chain"], icon: LinkIcon },
  { name: "UnlinkIcon", category: "Actions", keywords: ["disconnect","break"], icon: UnlinkIcon },
  { name: "ArrowUpIcon", category: "Navigation", keywords: ["north","previous"], icon: ArrowUpIcon },
  { name: "ArrowDownIcon", category: "Navigation", keywords: ["south","next"], icon: ArrowDownIcon },
  { name: "ArrowLeftIcon", category: "Navigation", keywords: ["back","previous"], icon: ArrowLeftIcon },
  { name: "ArrowRightIcon", category: "Navigation", keywords: ["forward","next"], icon: ArrowRightIcon },
  { name: "ChevronUpIcon", category: "Navigation", keywords: ["collapse"], icon: ChevronUpIcon },
  { name: "ChevronDownIcon", category: "Navigation", keywords: ["expand"], icon: ChevronDownIcon },
  { name: "ChevronLeftIcon", category: "Navigation", keywords: ["back","previous"], icon: ChevronLeftIcon },
  { name: "ChevronRightIcon", category: "Navigation", keywords: ["forward","next"], icon: ChevronRightIcon },
  { name: "ChevronsLeftIcon", category: "Navigation", keywords: ["first","rewind"], icon: ChevronsLeftIcon },
  { name: "ChevronsRightIcon", category: "Navigation", keywords: ["last","fast","forward"], icon: ChevronsRightIcon },
  { name: "MenuIcon", category: "Navigation", keywords: ["navigation","hamburger"], icon: MenuIcon },
  { name: "HomeIcon", category: "Navigation", keywords: ["dashboard"], icon: HomeIcon },
  { name: "PanelLeftIcon", category: "Navigation", keywords: ["sidebar"], icon: PanelLeftIcon },
  { name: "LogInIcon", category: "Navigation", keywords: ["sign","in","enter"], icon: LogInIcon },
  { name: "LogOutIcon", category: "Navigation", keywords: ["sign","out","exit"], icon: LogOutIcon },
  { name: "MaximizeIcon", category: "Navigation", keywords: ["fullscreen","expand"], icon: MaximizeIcon },
  { name: "InfoIcon", category: "Status", keywords: ["information"], icon: InfoIcon },
  { name: "CircleHelpIcon", category: "Status", keywords: ["question","support"], icon: CircleHelpIcon },
  { name: "CircleAlertIcon", category: "Status", keywords: ["warning","attention"], icon: CircleAlertIcon },
  { name: "TriangleAlertIcon", category: "Status", keywords: ["warning","danger"], icon: TriangleAlertIcon },
  { name: "CircleCheckIcon", category: "Status", keywords: ["success","complete"], icon: CircleCheckIcon },
  { name: "CircleXIcon", category: "Status", keywords: ["error","failed"], icon: CircleXIcon },
  { name: "BadgeCheckIcon", category: "Status", keywords: ["verified","approved"], icon: BadgeCheckIcon },
  { name: "BanIcon", category: "Status", keywords: ["blocked","prohibited"], icon: BanIcon },
  { name: "LoaderIcon", category: "Status", keywords: ["loading","progress"], icon: LoaderIcon },
  { name: "EyeIcon", category: "Status", keywords: ["view","visible"], icon: EyeIcon },
  { name: "EyeOffIcon", category: "Status", keywords: ["hidden","invisible"], icon: EyeOffIcon },
  { name: "LockIcon", category: "Status", keywords: ["secure","private"], icon: LockIcon },
  { name: "UnlockIcon", category: "Status", keywords: ["unsecure","public"], icon: UnlockIcon },
  { name: "ShieldIcon", category: "Status", keywords: ["security","protect"], icon: ShieldIcon },
  { name: "ShieldCheckIcon", category: "Status", keywords: ["secure","verified"], icon: ShieldCheckIcon },
  { name: "BellIcon", category: "Status", keywords: ["notification","alert"], icon: BellIcon },
  { name: "BellOffIcon", category: "Status", keywords: ["mute","notification"], icon: BellOffIcon },
  { name: "FileIcon", category: "Files and content", keywords: ["document"], icon: FileIcon },
  { name: "FileTextIcon", category: "Files and content", keywords: ["document","text"], icon: FileTextIcon },
  { name: "FilesIcon", category: "Files and content", keywords: ["documents","duplicate"], icon: FilesIcon },
  { name: "FolderIcon", category: "Files and content", keywords: ["directory"], icon: FolderIcon },
  { name: "FolderOpenIcon", category: "Files and content", keywords: ["directory","browse"], icon: FolderOpenIcon },
  { name: "ImageIcon", category: "Files and content", keywords: ["photo","picture"], icon: ImageIcon },
  { name: "ImagesIcon", category: "Files and content", keywords: ["gallery","photos"], icon: ImagesIcon },
  { name: "PaperclipIcon", category: "Files and content", keywords: ["attachment"], icon: PaperclipIcon },
  { name: "ClipboardIcon", category: "Files and content", keywords: ["paste"], icon: ClipboardIcon },
  { name: "ClipboardCheckIcon", category: "Files and content", keywords: ["task","complete"], icon: ClipboardCheckIcon },
  { name: "BookOpenIcon", category: "Files and content", keywords: ["documentation","read"], icon: BookOpenIcon },
  { name: "BookmarkIcon", category: "Files and content", keywords: ["save","favorite"], icon: BookmarkIcon },
  { name: "TagIcon", category: "Files and content", keywords: ["label","category"], icon: TagIcon },
  { name: "ArchiveIcon", category: "Files and content", keywords: ["store","box"], icon: ArchiveIcon },
  { name: "InboxIcon", category: "Files and content", keywords: ["mail","tray"], icon: InboxIcon },
  { name: "CalendarIcon", category: "Files and content", keywords: ["date","schedule"], icon: CalendarIcon },
  { name: "ClockIcon", category: "Files and content", keywords: ["time"], icon: ClockIcon },
  { name: "HistoryIcon", category: "Files and content", keywords: ["recent","restore"], icon: HistoryIcon },
  { name: "UserIcon", category: "People and communication", keywords: ["person","account"], icon: UserIcon },
  { name: "UsersIcon", category: "People and communication", keywords: ["people","team","group"], icon: UsersIcon },
  { name: "UserPlusIcon", category: "People and communication", keywords: ["invite","add","person"], icon: UserPlusIcon },
  { name: "UserMinusIcon", category: "People and communication", keywords: ["remove","person"], icon: UserMinusIcon },
  { name: "MailIcon", category: "People and communication", keywords: ["email","envelope"], icon: MailIcon },
  { name: "SendIcon", category: "People and communication", keywords: ["message","submit"], icon: SendIcon },
  { name: "MessageCircleIcon", category: "People and communication", keywords: ["chat","comment"], icon: MessageCircleIcon },
  { name: "MessagesSquareIcon", category: "People and communication", keywords: ["conversation","chat"], icon: MessagesSquareIcon },
  { name: "PhoneIcon", category: "People and communication", keywords: ["call"], icon: PhoneIcon },
  { name: "VideoIcon", category: "People and communication", keywords: ["camera","meeting"], icon: VideoIcon },
  { name: "MicIcon", category: "People and communication", keywords: ["microphone","audio"], icon: MicIcon },
  { name: "MicOffIcon", category: "People and communication", keywords: ["mute","microphone"], icon: MicOffIcon },
  { name: "AtSignIcon", category: "People and communication", keywords: ["mention","email"], icon: AtSignIcon },
  { name: "ContactIcon", category: "People and communication", keywords: ["address","book"], icon: ContactIcon },
  { name: "GlobeIcon", category: "People and communication", keywords: ["world","web","language"], icon: GlobeIcon },
  { name: "MapPinIcon", category: "People and communication", keywords: ["location","place"], icon: MapPinIcon },
  { name: "ShoppingCartIcon", category: "Commerce and data", keywords: ["commerce","buy"], icon: ShoppingCartIcon },
  { name: "CreditCardIcon", category: "Commerce and data", keywords: ["payment","billing"], icon: CreditCardIcon },
  { name: "WalletCardsIcon", category: "Commerce and data", keywords: ["payment","money"], icon: WalletCardsIcon },
  { name: "ReceiptIcon", category: "Commerce and data", keywords: ["invoice","bill"], icon: ReceiptIcon },
  { name: "BadgeDollarSignIcon", category: "Commerce and data", keywords: ["price","payment"], icon: BadgeDollarSignIcon },
  { name: "DollarSignIcon", category: "Commerce and data", keywords: ["currency","money"], icon: DollarSignIcon },
  { name: "TrendingUpIcon", category: "Commerce and data", keywords: ["growth","increase"], icon: TrendingUpIcon },
  { name: "TrendingDownIcon", category: "Commerce and data", keywords: ["decline","decrease"], icon: TrendingDownIcon },
  { name: "ChartBarIcon", category: "Commerce and data", keywords: ["analytics","graph"], icon: ChartBarIcon },
  { name: "ChartPieIcon", category: "Commerce and data", keywords: ["analytics","graph"], icon: ChartPieIcon },
  { name: "DatabaseIcon", category: "Commerce and data", keywords: ["storage","data"], icon: DatabaseIcon },
  { name: "TableIcon", category: "Commerce and data", keywords: ["rows","columns","data"], icon: TableIcon },
  { name: "ListIcon", category: "Commerce and data", keywords: ["rows","items"], icon: ListIcon },
  { name: "GridIcon", category: "Commerce and data", keywords: ["tiles","layout"], icon: GridIcon },
  { name: "PackageIcon", category: "Commerce and data", keywords: ["box","product"], icon: PackageIcon },
  { name: "TruckIcon", category: "Commerce and data", keywords: ["delivery","shipping"], icon: TruckIcon },
  { name: "SettingsIcon", category: "System and media", keywords: ["preferences","cog"], icon: SettingsIcon },
  { name: "MonitorIcon", category: "System and media", keywords: ["desktop","display"], icon: MonitorIcon },
  { name: "SmartphoneIcon", category: "System and media", keywords: ["mobile","phone"], icon: SmartphoneIcon },
  { name: "WifiIcon", category: "System and media", keywords: ["network","connection"], icon: WifiIcon },
  { name: "WifiOffIcon", category: "System and media", keywords: ["offline","disconnected"], icon: WifiOffIcon },
  { name: "CloudIcon", category: "System and media", keywords: ["hosting","storage"], icon: CloudIcon },
  { name: "PlayIcon", category: "System and media", keywords: ["start","media"], icon: PlayIcon },
  { name: "PauseIcon", category: "System and media", keywords: ["stop","media"], icon: PauseIcon },
  { name: "Volume2Icon", category: "System and media", keywords: ["sound","audio"], icon: Volume2Icon },
  { name: "VolumeXIcon", category: "System and media", keywords: ["mute","sound"], icon: VolumeXIcon },
  { name: "SunIcon", category: "System and media", keywords: ["light","theme"], icon: SunIcon },
  { name: "MoonIcon", category: "System and media", keywords: ["dark","theme"], icon: MoonIcon },
  { name: "PaletteIcon", category: "System and media", keywords: ["color","design"], icon: PaletteIcon },
  { name: "ZapIcon", category: "System and media", keywords: ["lightning","energy","fast"], icon: ZapIcon },
  { name: "GitHubIcon", category: "Brands", keywords: ["brand","code","repository"], icon: GitHubIcon },
  { name: "DevpostIcon", category: "Brands", keywords: ["brand","hackathon"], icon: DevpostIcon },
  { name: "LinkedInIcon", category: "Brands", keywords: ["brand","professional","network"], icon: LinkedInIcon },
] as const satisfies readonly IconCatalogItem[];

export const iconCategories = ["All", "Actions", "Navigation", "Status", "Files and content", "People and communication", "Commerce and data", "System and media", "Brands"] as const;
