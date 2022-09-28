import Image from "next/future/image";

import Link from "@components/ui/Link";
import { capitalize } from "@lib/string";

const SOCIAL_LINKS = {
  instagram: {
    href: "https://www.instagram.com/georgekrax",
    imgSrc: "/instagram_logo.webp",
  },
  facebook: {
    href: "https://www.instagram.com/georgekrax",
    imgSrc: "/facebook_logo.png",
  },
};

type Props = { platform: keyof typeof SOCIAL_LINKS };

const SocialButton = ({ platform }: Props): ComponentElement => {
  // padding: map-get($em - spacers, 8);
  //   margin-right: map-get($em-spacers, 16);
  //   margin-bottom: 0;
  //   border-radius: 14px;
  //   background-color: $grey-4;
  //   filter: grayscale(100%);
  //   user-select: none;
  //   @include transition-2s("ease-out", "background-color");

  //   &:last-child {
  //     margin-right: 0;
  //     background-color: rgba($grey-4, 0.85);
  //   }

  //   &:hover {
  //     background-color: $grey-5;
  //   }

  //   &:active {
  //     background-color: $grey-6;
  //   }
  return (
    <Link
      newTab
      href={SOCIAL_LINKS[platform].href}
      className="flex-row-center-center"
      rel="noreferrer"
      p={2}
      bg="gray.300"
      userSelect="none"
      borderRadius="xl"
      filter="grayscale(100%)"
      _hover={{ bg: "gray.400" }}
      _active={{ bg: "gray.500" }}
    >
      <Image
        src={SOCIAL_LINKS[platform].imgSrc}
        alt={capitalize(platform) + " logo"}
        width={32}
        height={32}
      />
    </Link>
  );
};

SocialButton.displayName = "SocialButton";

export default SocialButton;
