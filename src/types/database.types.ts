export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          user_id: string
          name: string
          slug: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      components: {
        Row: {
          id: string
          project_id: string
          name: string
          entry_file: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          name: string
          entry_file?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          name?: string
          entry_file?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      component_versions: {
        Row: {
          id: string
          component_id: string
          version_number: number
          source: string
          dependencies: Json
          preview_config: Json
          created_at: string
        }
        Insert: {
          id?: string
          component_id: string
          version_number: number
          source: string
          dependencies?: Json
          preview_config?: Json
          created_at?: string
        }
        Update: {
          id?: string
          component_id?: string
          version_number?: number
          source?: string
          dependencies?: Json
          preview_config?: Json
          created_at?: string
        }
        Relationships: []
      }
      share_links: {
        Row: {
          id: string
          component_version_id: string
          token: string
          is_public: boolean
          created_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          component_version_id: string
          token: string
          is_public?: boolean
          created_at?: string
          expires_at?: string | null
        }
        Update: {
          id?: string
          component_version_id?: string
          token?: string
          is_public?: boolean
          created_at?: string
          expires_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
