import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "lumen-house";
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER ?? "";
const isUserSite = repositoryName.toLowerCase() === `${repositoryOwner.toLowerCase()}.github.io`;
const pagesBasePath = process.env.PAGES_BASE_PATH ?? (isUserSite ? "" : `/${repositoryName}`);

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? pagesBasePath : "",
  },
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath: pagesBasePath,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
