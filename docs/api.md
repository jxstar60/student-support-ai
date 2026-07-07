# Student Support AI API

## GET /health

响应示例：

```json
{
  "status": "ok",
  "app": "Student Support AI",
  "database": "ok",
  "knowledge_base": "ok",
  "documents": "ok"
}
```

## POST /api/chat

请求示例：

```json
{
  "message": "留学生可以每周打工多少小时？",
  "category": "工作·打工",
  "language": "zh",
  "session_id": null
}
```

响应示例：

```json
{
  "session_id": "session_id",
  "message_id": "assistant_message_id",
  "reply": "根据当前知识库，...",
  "source": "knowledge",
  "references": [
    {
      "title": "留学生打工时间限制",
      "source_name": "出入国在留管理厅",
      "source_url": "https://www.moj.go.jp/isa/"
    }
  ]
}
```

## GET /api/knowledge

查询参数：

- `category`
- `keyword`

响应：知识库条目数组。

## POST /api/knowledge

请求示例：

```json
{
  "category": "生活指南",
  "title": "住址变更",
  "content": "搬家后通常需要办理住址变更手续。",
  "source_name": "自治体窗口",
  "source_url": "https://www.soumu.go.jp/",
  "keywords": ["搬家", "住址变更"]
}
```

## POST /api/documents/upload

请求类型：`multipart/form-data`

字段：

- `file`
- `category`
- `source_name`
- `source_url`
- `keywords`

响应示例：

```json
{
  "success": true,
  "filename": "moving.txt",
  "category": "生活指南",
  "chunks_created": 1,
  "file_size": 300
}
```

## GET /api/documents

返回已上传文件列表。

## DELETE /api/documents/{filename}

删除上传文件，并同步删除由该文件导入的知识库条目。

## GET /api/admin/dashboard

响应包含：

- 总咨询数
- 总消息数
- 知识库条目数
- 上传文档数
- 用户反馈总数
- 好评数
- 差评数
- 各分类咨询统计
- 最近 5 条咨询记录
