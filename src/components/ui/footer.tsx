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
      <Link href="" className="text-[#ff3332] hover:neon-text transition-all">
        ???
      </Link>
    </footer>
  );
};

export default Footer;
