import Link from "next/link";

export default function Footer() {
  return (
    <div className="absolute bottom-4 w-full z-50 text-gray-400 hover:text-black transition-colors">
      <div className="max-w-4xl mx-auto flex justify-center items-center">
        <Link
          href="https://github.com/tambo-ai/tambo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-md flex items-center gap-2 hover:text-black transition-colors"
        >
          Built with ❤️ using Tambo
        </Link>
      </div>
    </div>
  );
}
