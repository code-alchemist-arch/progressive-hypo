import { useRouter } from 'next/router';
import Image from 'next/image';

interface IconButtonProps {
  src: string;
  alt: string;
  onClick: () => void;
}

function IconButton({ src, alt, onClick }: IconButtonProps) {
  return <Image src={src} alt={alt} width="44" height="44" onClick={onClick} />;
}

interface HeaderProps {
  title?: string | null;
  isVisibleBack?: boolean;
  isVisibleShare?: boolean;
}

export default function Header({
  title,
  isVisibleBack,
  isVisibleShare,
}: HeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-white">
      <div className="flex justify-between items-center py-4 px-4">
        {isVisibleBack && (
          <IconButton
            src="/images/left-arrow-icon.svg"
            alt="left-arrow"
            onClick={() => router.replace('/')}
          />
        )}
        <p className="text-center text-base font-medium w-full">{ title }</p>
        {isVisibleShare && (
          <IconButton
            src="/images/back-icon.svg"
            alt="back-icon"
            onClick={() => router.replace('/lead')}
          />
        )}
      </div>
    </header>
  );
}

Header.defaultProps = {
  title: 'Hypo Check',
  isVisibleBack: false,
  isVisibleHome: false,
}
