import type { Socials } from "@/types/payload";
import { Match, type Component, type ParentProps, Switch } from "solid-js";

interface Props {
  socialPlatform: Socials[number];
}

const SocialPlatform: Component<Props> = ({
  socialPlatform: { platform, url },
}) => {
  const ariaLabel = `Przejdź do naszego profilu na platformie ${platform}`;

  return (
    <Switch>
      <Match when={platform === "x"}>
        <PlatformLink href={url} aria-label={ariaLabel}>
          <XIcon />
        </PlatformLink>
      </Match>
      <Match when={platform === "instagram"}>
        <PlatformLink href={url} aria-label={ariaLabel}>
          <InstagramIcon />
        </PlatformLink>
      </Match>
      <Match when={platform === "facebook"}>
        <PlatformLink href={url} aria-label={ariaLabel}>
          <FacebookIcon />
        </PlatformLink>
      </Match>
    </Switch>
  );
};

export default SocialPlatform;

interface PlatformLinkProps {
  "aria-label": string;
  href: string;
}

const PlatformLink: Component<ParentProps<PlatformLinkProps>> = ({
  children,
  ...props
}) => {
  return (
    <a class="hover:bg-yellow-highlight h-5 w-5" {...props} target="_blank">
      {children}
    </a>
  );
};

const XIcon = () => {
  return (
    <svg
      shape-rendering="geometricPrecision"
      text-rendering="geometricPrecision"
      image-rendering="optimizeQuality"
      fill-rule="evenodd"
      clip-rule="evenodd"
      viewBox="0 0 512 462.799"
    >
      <path
        fill-rule="nonzero"
        d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
      />
    </svg>
  );
};

const InstagramIcon = () => {
  return (
    <svg viewBox="0 0 169.063 169.063">
      <g>
        <path
          d="M122.406,0H46.654C20.929,0,0,20.93,0,46.655v75.752c0,25.726,20.929,46.655,46.654,46.655h75.752
c25.727,0,46.656-20.93,46.656-46.655V46.655C169.063,20.93,148.133,0,122.406,0z M154.063,122.407
c0,17.455-14.201,31.655-31.656,31.655H46.654C29.2,154.063,15,139.862,15,122.407V46.655C15,29.201,29.2,15,46.654,15h75.752
c17.455,0,31.656,14.201,31.656,31.655V122.407z"
        />
        <path
          d="M84.531,40.97c-24.021,0-43.563,19.542-43.563,43.563c0,24.02,19.542,43.561,43.563,43.561s43.563-19.541,43.563-43.561
C128.094,60.512,108.552,40.97,84.531,40.97z M84.531,113.093c-15.749,0-28.563-12.812-28.563-28.561
c0-15.75,12.813-28.563,28.563-28.563s28.563,12.813,28.563,28.563C113.094,100.281,100.28,113.093,84.531,113.093z"
        />
        <path
          d="M129.921,28.251c-2.89,0-5.729,1.17-7.77,3.22c-2.051,2.04-3.23,4.88-3.23,7.78c0,2.891,1.18,5.73,3.23,7.78
c2.04,2.04,4.88,3.22,7.77,3.22c2.9,0,5.73-1.18,7.78-3.22c2.05-2.05,3.22-4.89,3.22-7.78c0-2.9-1.17-5.74-3.22-7.78
C135.661,29.421,132.821,28.251,129.921,28.251z"
        />
      </g>
    </svg>
  );
};

const FacebookIcon = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M9.89231 21V13.2538H7V9.94249H9.89231C9.89231 6.42419 9.89231 2.07805 17 3.17198V6.03983C13.9231 5.71462 13.6154 6.66071 13.6154 9.94249H17L16.3231 13.2538H13.6154V21"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
