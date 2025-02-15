import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ThemeImage
          className={styles.logo}
          srcLight="zimdevs-dark.svg"
          srcDark="zimdevs-light.svg"
          alt="Zim Developers logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>apps/web/app/page.tsx</code>
          </li>
          <li>Save and create a pull request.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://chat.whatsapp.com/FfXS39iLv7k36jrskKjOfX"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/whatsapp.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Join Group
          </a>
          <a
            href="https://github.com/orgs/zimdevlabs/projects/1"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Check project status
          </a>
        </div>
        <Button appName="web" className={styles.secondary}>
          Open alert
        </Button>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://github.com/zimdevlabs/zimdevelopers.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          View source
        </a>
        <a
          href="https://github.com/zimdevlabs/zimdevelopers.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to public repo →
        </a>
      </footer>
    </div>
  );
}
