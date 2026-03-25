# Supabase 配置说明

## 获取 Supabase 凭证

1. 访问 [Supabase](https://supabase.com) 并创建新项目
2. 进入项目设置，找到 API 设置
3. 复制您的项目 URL 和 anon key
4. 复制 service key（用于后端操作）

## 获取 ZPay 商户信息

1. 访问 [ZPay](https://zpay.com) 并注册商户账户
2. 进入商户后台，获取您的商户 ID 和商户密钥
3. 配置回调 URL：
   - **通知 URL (Notify URL)**: `http://localhost:3000/api/zpay/notify`
   - **返回 URL (Return URL)**: `http://localhost:3000/api/zpay/return`

## 配置步骤

1. 复制 `.env.local.example` 到 `.env.local`
2. 填写您的 Supabase 凭证
3. 填写您的 ZPay 商户信息
4. 确保 `NEXT_PUBLIC_SITE_URL` 设置为您的实际域名

## 安全提示

- **不要**将 `.env.local` 提交到版本控制系统
- `.gitignore` 已经配置忽略 `.env.local`
- `SUPABASE_SERVICE_KEY` 应该只在服务器端使用，不要暴露给前端

## PostgreSQL 连接

Supabase 使用 PostgreSQL 数据库，您可以通过以下方式连接：

```bash
psql "postgresql://postgres:[YOUR-PASSWORD]@db.bikbmxqjwizdebrwvqla.supabase.co:5432/postgres"
```

## API 端点

- **支付通知**: `/api/zpay/notify` (POST)
- **支付返回**: `/api/zpay/return` (GET)
