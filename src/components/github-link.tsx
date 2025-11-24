import { Github } from "lucide-react";
import Link from "next/link";

export default function GithubLink() {
  const githubRepoUrl =
    process.env.NEXT_PUBLIC_GITHUB_REPO_URL ||
    "https://github.com/MichaelMilstead/timeline-of-everything";

  return (
    <Link
      href={githubRepoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute top-4 left-4 z-50 text-gray-400 hover:text-black  transition-colors"
      aria-label="View on GitHub"
    >
      <Github size={24} className="text-black" />
    </Link>
  );
}
