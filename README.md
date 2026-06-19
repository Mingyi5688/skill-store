# Invest Skill Store MVP

投资研究 Skill 应用商店第一版 MVP。项目目标是把公开投资研究方法论变成可运行、可验证、可复盘的 Skill 工作流。

当前版本使用 Next.js + TypeScript + Tailwind CSS + App Router，本地 mock 数据运行，不连接真实数据库、支付、交易 API 或真实 AI API。

## 本地运行

```powershell
npm.cmd install
npm.cmd run dev
```

打开：

```text
http://localhost:3000
```

## 页面

- `/` 首页
- `/skills` Skill 商店页
- `/skills/[id]` Skill 详情页
- `/run/[id]` Skill 运行页
- `/creator` 创作者入驻页
- `/about` 关于页

## Mock Skill

- `serenity-supply-chain-bottleneck`
- `crypto-meme-radar`
- `polymarket-15m-trader-filter`

## 环境变量

第一版不需要真实环境变量即可运行。后续接入 OpenAI 或 Supabase 时，可以从 `.env.example` 复制：

```powershell
Copy-Item .env.example .env.local
```

如果 PowerShell 提示 `无法加载文件 npm.ps1`，继续使用 `npm.cmd` 即可，不需要修改系统执行策略。

## 已完成

- Next.js App Router 项目结构
- 中文 SaaS / 金融研究终端风格页面
- 3 个本地 mock Skill
- Skill 列表、详情、运行页
- 本地 mock 报告生成
- Watchlist localStorage 临时保存
- 全站合规免责声明

## 暂未完成

- 真实 OpenAI API 调用
- Supabase 数据库保存
- 登录系统
- Stripe 支付
- 创作者后台
- 真实行情、链上或 Polymarket 数据接入

## 合规提示

本产品仅用于公开资料整理、投资研究辅助和学习，不构成投资建议、买卖建议、收益承诺或个性化资产配置建议。用户需自行判断并承担投资风险。
