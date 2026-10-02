# Data Model

Postgres/Supabase suggested schema.

## users

Use Supabase Auth as the identity source.

## projects

```text
id uuid pk
user_id uuid
name text
slug text
description text nullable
created_at timestamptz
updated_at timestamptz
```

## components

```text
id uuid pk
project_id uuid
name text
entry_file text
created_at timestamptz
updated_at timestamptz
```

## component_versions

```text
id uuid pk
component_id uuid
version_number integer
source text
dependencies jsonb
preview_config jsonb
created_at timestamptz
```

## share_links

```text
id uuid pk
component_version_id uuid
token text unique
is_public boolean
created_at timestamptz
expires_at timestamptz nullable
```

## events

```text
id uuid pk
user_id uuid nullable
event_name text
metadata jsonb
created_at timestamptz
```

## Row-level security

Users can:
- read/write their own projects
- read versions belonging to their projects
- create/delete their own share links

Public share access should only expose explicitly shared version data.
