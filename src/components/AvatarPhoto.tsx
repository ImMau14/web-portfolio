import Avatar from "@assets/avatar.webp"

interface AvatarPhotoProps {
  className?: string
}

export const AvatarPhoto = ({ className = "" }: AvatarPhotoProps) => {
  return <img src={Avatar.src} alt="Avatar photo" className={className} />
}

export default AvatarPhoto
