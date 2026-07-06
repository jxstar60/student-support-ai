# student-support-ai

面向在日外国留学生的 AI 生活支援系统。当前阶段只完成项目初始化，适合作为毕业设计和企业作品集的工程起点。

## 技术栈

- 前端: React, TypeScript, Vite, Tailwind CSS
- 后端: FastAPI, SQLAlchemy, Alembic
- 数据库: SQLite（开发阶段）
- 其他: Docker, Docker Compose, Git

## 目录结构

```text
student-support-ai/
├── frontend/
├── backend/
├── docs/
├── docker/
├── scripts/
├── tests/
├── README.md
├── docker-compose.yml
└── .gitignore
```

## 当前已完成

- React + TypeScript + Vite 前端初始化
- Tailwind CSS 配置
- FastAPI 后端初始化
- CORS 跨域配置
- SQLAlchemy 数据库连接配置
- Alembic 数据库迁移配置
- `GET /health` 健康检查接口
- 前端 Dockerfile
- 后端 Dockerfile
- Docker Compose 编排
- 基础测试

## 暂不包含

- OpenAI 接入
- 聊天功能
- 登录功能
- 数据库业务表
- 业务 API

## 使用 Docker 运行

在项目根目录执行：

```bash
docker compose up --build
```

运行后访问：

- 前端: http://localhost:5173
- 后端: http://localhost:8000
- 健康检查: http://localhost:8000/health
- API 文档: http://localhost:8000/docs

## 本地运行后端

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

Windows PowerShell:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

验证接口：

```bash
curl http://localhost:8000/health
```

期望返回：

```json
{
  "status": "ok"
}
```

## 本地运行前端

```bash
cd frontend
npm install
npm run dev
```

访问：

```text
http://localhost:5173
```

## 运行测试

在项目根目录执行：

```bash
pip install -r requirements.txt
pytest
```

## 环境变量

根目录提供 `.env.example`。如需本地自定义配置：

```bash
cp .env.example .env
```

主要变量：

- `DATABASE_URL`: 后端数据库连接地址
- `BACKEND_CORS_ORIGINS`: 允许访问后端的前端地址
- `VITE_API_BASE_URL`: 前端请求后端的基础地址
