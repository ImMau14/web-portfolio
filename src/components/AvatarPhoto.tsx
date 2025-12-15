import Avatar from "@assets/avatar.webp"
import Avatar273x273 from "@assets/avatar-273x273.webp"

interface AvatarPhotoProps {
  className?: string
}

export const AvatarPhoto = ({ className = "" }: AvatarPhotoProps) => {
  return (
    <picture className="relative overflow-hidden rounded-full before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-full before:shadow-[inset_0px_3px_0px_rgba(255,255,255,0.2)] after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-full after:shadow-[inset_0px_-3px_0px_rgba(0,0,0,0.2)]">
      <source srcSet={Avatar273x273.src} media="(max-width: 767px)" />
      <source srcSet={Avatar.src} media="(min-width: 768px)" />
      <img src={Avatar.src} alt="Avatar photo" className={className} />
    </picture>
  )
}

export default AvatarPhoto
