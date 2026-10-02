# API / Server Contract

The preview itself should be primarily client-side. The API is for persistence and account-owned data.

## Projects

`GET /api/projects`

Returns user's projects.

`POST /api/projects`

Body:
```json
{
  "name": "My Button",
  "description": "A test component"
}
```

## Components

`POST /api/projects/:projectId/components`

`GET /api/components/:componentId`

## Versions

`POST /api/components/:componentId/versions`

Body:
```json
{
  "source": "export default function Button() { return <button>Hi</button> }",
  "dependencies": {
    "lucide-react": "^0.468.0"
  },
  "previewConfig": {
    "theme": "light",
    "viewport": "desktop"
  }
}
```

## Share

`POST /api/versions/:versionId/share`

Returns:
```json
{
  "token": "public-token"
}
```

`GET /p/:token`

Public read-only page.

## Error shape

All API errors:

```ts
type ApiError = {
  code: string
  message: string
  requestId?: string
}
```

Never expose stack traces from server internals to end users.
