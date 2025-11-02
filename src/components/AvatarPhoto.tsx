import Avatar from "@assets/avatar.webp"
import Avatar273x273 from "@assets/avatar-273x273.webp"

interface AvatarPhotoProps {
  className?: string
}

export const AvatarPhoto = ({ className = "" }: AvatarPhotoProps) => {
  return (
    <picture>
      <source srcSet={Avatar273x273.src} media="(max-width: 767px)" />
      <source srcSet={Avatar.src} media="(min-width: 768px)" />
      <img src={Avatar.src} alt="Avatar photo" className={className} />
    </picture>
  )
}

export default AvatarPhoto
