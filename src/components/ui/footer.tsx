import Link from "next/link";

interface FooterProps {
  isSignup?: boolean;
}

const Footer = ({ isSignup }: FooterProps) => {
  return (
    <footer
      className={`${
        isSignup ? "hidden sm:flex" : "flex"
      } absolute bottom-0 gap-1 mb-7 md:mb-11 w-full items-center justify-center text-center`}
    >
      <h2>Produced By </h2>
      <Link
        href="https://quackity.studio/"
        target="_blank"
        className="text-[#ff3332] hover:neon-text transition-all"
      >
        Quackity Studios
      </Link>
    </footer>
  );
};

export default Footer;
