# 系统架构

`student-support-ai` 当前只完成项目初始化，不包含业务功能。

## 后端分层

- `core`: 应用配置、CORS 等基础设施配置。
- `domain`: 业务实体和领域规则。当前保留目录，不写业务逻辑。
- `application`: 用例编排和应用服务。当前保留目录，不写业务逻辑。
- `infrastructure`: 数据库、外部服务等技术适配层。
- `presentation`: HTTP API 入口。

## 前端分层

- `components`: 可复用 UI 组件。
- `pages`: 页面级组件。
- `lib`: API 客户端等通用工具。
- `config`: 前端环境变量配置。
- `styles`: Tailwind 和全局样式。

## 当前接口

- `GET /health`

返回：

```json
{
  "status": "ok"
}
```
