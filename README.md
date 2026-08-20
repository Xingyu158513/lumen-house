# Lumen House Collection

一个原创的多页面豪华酒店网站概念，用来研究并复现当代酒店官网的内容架构、全屏叙事、预订入口与移动端交互。品牌、酒店名称、文案、代码与图片均为本项目原创；项目不打包万豪、丽思卡尔顿、四季或安缦的商标及官网图片。

## 页面

- `/`：沉浸式首页、即时查询、酒店精选、分层叙事、全屏酒店切换与行旅志
- `/hotels`：酒店名录、区域筛选与搜索
- `/property`：酒店概览、房型、餐饮、在地体验与画廊
- `/reserve`：日期、房型、确认三步前端预订演示

## 本地运行

```powershell
npm install
npm run dev -- --port 3001
```

构建与检查：

```powershell
npm run lint
npm run build
```

## GitHub Pages

项目保留 React、滚动动画、菜单、轮播、筛选和三步预订交互。推送到 GitHub 仓库的 `main` 分支后，`.github/workflows/deploy-pages.yml` 会自动执行 Next.js 静态导出并发布到：

```text
https://<GitHub 用户名>.github.io/<仓库名>/
```

在仓库 `Settings → Pages` 中把 `Source` 设为 `GitHub Actions`。本地验证 Pages 构建时可运行：

```powershell
$env:GITHUB_PAGES='true'
$env:GITHUB_REPOSITORY='你的用户名/仓库名'
$env:GITHUB_REPOSITORY_OWNER='你的用户名'
$env:NEXT_PUBLIC_SITE_URL='https://你的用户名.github.io'
npm run build:pages
```

研究依据见 [酒店官网基准研究](docs/research/hotel-site-benchmark-2026-08-02.md)，完整实现记录见 [迭代索引](docs/iterations/README.md)。

## 素材边界

`public/images` 与 `public/og.png` 是为这个虚构品牌生成并优化的原创项目素材。页面不会向万豪等官网请求图片、视频、字体或脚本，也不会把官方商标伪装成本站品牌。

