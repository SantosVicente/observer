interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return (
    <p className="text-[#ff3332] text-4xl md:text-6xl font-bold uppercase neon-text">
      {title}
    </p>
  );
};

export default Title;
