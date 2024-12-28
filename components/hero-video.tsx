import HeroVideoDialog from "@/components/ui/hero-video-dialog";

export function HeroVideo() {
  return (
    <div className="relative">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/7Fh--nXCOz0?si=Kqw2qoxQm2Tgmh0K"
        thumbnailSrc="https://cdn0.casamentos.com.br/vendor/5087/original/1280/jpg/v-e-l-151-de-1087_13_235087-172726923951424.webp"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/7Fh--nXCOz0?si=Kqw2qoxQm2Tgmh0K"
        thumbnailSrc="https://cdn0.casamentos.com.br/vendor/5087/original/1280/jpg/v-e-l-151-de-1087_13_235087-172726923951424.webp"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
