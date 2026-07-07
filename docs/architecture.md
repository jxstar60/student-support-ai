# Student Support AI 架构说明

## 系统概览

Student Support AI 是一个前后端分离的留学生生活支援系统。前端负责门户页面、咨询交互和后台管理；后端负责聊天记录、知识库检索、资料导入、统计数据和健康检查。

```text
React Frontend
  ↓ HTTP JSON / multipart
FastAPI Backend
  ↓
Application Services
  ↓
SQLite / JSON Knowledge Base / Uploaded Documents
```

## 前端模块

- `pages/`: 页面级组件，包括首页、聊天页、后台页面和占位页面。
- `components/layout/`: Header、Footer、Layout。
- `components/chat/`: 咨询分类、聊天消息、输入框、历史侧栏、注意事项。
- `components/admin/`: 知识库表格、知识表单、资料上传表单、上传文件列表。
- `services/`: API 调用封装。
- `config/api.ts`: 统一管理后端 API 地址。

## 后端模块

- `app/main.py`: FastAPI 应用入口。
- `app/core/config.py`: 统一配置 APP_NAME、DATABASE_URL、CORS、数据目录和上传目录。
- `app/api/`: 聊天、知识库、资料导入、后台统计 API。
- `app/services/`: 本地知识库检索、资料解析、知识库回复生成。
- `app/db/`: SQLAlchemy 数据库连接和模型。
- `app/data/knowledge/`: JSON 知识库文件。
- `app/data/uploads/`: 上传文件和上传元数据。

## 数据流

1. 用户在 `/chat` 输入问题并选择分类。
2. 前端调用 `POST /api/chat`。
3. 后端保存用户消息到 SQLite。
4. 后端根据问题和分类检索 JSON 知识库。
5. 后端生成知识库回复并保存 assistant 消息。
6. 前端显示回复、参考资料和反馈按钮。

## RAG MVP 流程

当前版本不使用向量数据库。检索逻辑为轻量关键词加权：

- keywords 命中权重最高
- title 命中其次
- content 命中再次
- category 命中最低
- 用户选择分类时优先搜索该分类
- 该分类无命中时 fallback 到全部分类
- 最多返回 3 条参考资料

## 资料导入流程

1. 管理员在 `/admin/documents` 上传 PDF/TXT。
2. 后端保存原始文件。
3. 后端解析文本并切分为 500-800 字左右的 chunks。
4. 每个 chunk 写入对应分类的 JSON 知识库。
5. 生成的知识条目带有 `document_filename`。
6. 删除上传文件时，同步删除该文件导入的知识条目。
