import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex absolute bottom-0 gap-1 mb-7 md:mb-11 w-full items-center justify-center text-center">
      <h2>Produced By </h2>
      <Link href="" className="text-[#ff3332] hover:neon-text transition-all">
        Quackity Studios
      </Link>
    </footer>
  );
};

export default Footer;
