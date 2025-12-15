export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      calendar_events: {
        Row: {
          all_day: boolean | null
          color: string | null
          created_at: string | null
          description: string | null
          end_time: string | null
          id: string
          start_time: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          all_day?: boolean | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          id?: string
          start_time: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          all_day?: boolean | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          id?: string
          start_time?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          gallery: string[] | null
          hero: Json | null
          id: string
          info_columns: Json | null
          key_features: Json | null
          overview: Json | null
          pinned: boolean | null
          published_at: string | null
          school_id: string | null
          sections: Json | null
          status: string | null
          testimonial: Json | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          gallery?: string[] | null
          hero?: Json | null
          id?: string
          info_columns?: Json | null
          key_features?: Json | null
          overview?: Json | null
          pinned?: boolean | null
          published_at?: string | null
          school_id?: string | null
          sections?: Json | null
          status?: string | null
          testimonial?: Json | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          gallery?: string[] | null
          hero?: Json | null
          id?: string
          info_columns?: Json | null
          key_features?: Json | null
          overview?: Json | null
          pinned?: boolean | null
          published_at?: string | null
          school_id?: string | null
          sections?: Json | null
          status?: string | null
          testimonial?: Json | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_studies_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      collection_items: {
        Row: {
          collection_id: string
          created_at: string | null
          id: string
          item_id: string
          item_type: string
          notes: string | null
          order_index: number | null
        }
        Insert: {
          collection_id: string
          created_at?: string | null
          id?: string
          item_id: string
          item_type: string
          notes?: string | null
          order_index?: number | null
        }
        Update: {
          collection_id?: string
          created_at?: string | null
          id?: string
          item_id?: string
          item_type?: string
          notes?: string | null
          order_index?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "collection_items_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      monitor_alerts: {
        Row: {
          alert_config: Json | null
          alert_type: string
          created_at: string | null
          id: string
          is_active: boolean | null
          monitor_id: string
        }
        Insert: {
          alert_config?: Json | null
          alert_type: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          monitor_id: string
        }
        Update: {
          alert_config?: Json | null
          alert_type?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          monitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "monitor_alerts_monitor_id_fkey"
            columns: ["monitor_id"]
            isOneToOne: false
            referencedRelation: "monitors"
            referencedColumns: ["id"]
          },
        ]
      }
      monitor_details: {
        Row: {
          change_type: string | null
          created_at: string | null
          current_value: string | null
          current_value_full: string | null
          field_name: string
          id: string
          magnitude_percentage: number | null
          modified_at: string | null
          monitor_id: string
          previous_value: string | null
          previous_value_full: string | null
          triggers: Json | null
          unread_count: number | null
        }
        Insert: {
          change_type?: string | null
          created_at?: string | null
          current_value?: string | null
          current_value_full?: string | null
          field_name: string
          id?: string
          magnitude_percentage?: number | null
          modified_at?: string | null
          monitor_id: string
          previous_value?: string | null
          previous_value_full?: string | null
          triggers?: Json | null
          unread_count?: number | null
        }
        Update: {
          change_type?: string | null
          created_at?: string | null
          current_value?: string | null
          current_value_full?: string | null
          field_name?: string
          id?: string
          magnitude_percentage?: number | null
          modified_at?: string | null
          monitor_id?: string
          previous_value?: string | null
          previous_value_full?: string | null
          triggers?: Json | null
          unread_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "monitor_details_monitor_id_fkey"
            columns: ["monitor_id"]
            isOneToOne: false
            referencedRelation: "monitors"
            referencedColumns: ["id"]
          },
        ]
      }
      monitor_fields: {
        Row: {
          created_at: string | null
          field_name: string
          field_type: string
          id: string
          monitor_id: string
        }
        Insert: {
          created_at?: string | null
          field_name: string
          field_type: string
          id?: string
          monitor_id: string
        }
        Update: {
          created_at?: string | null
          field_name?: string
          field_type?: string
          id?: string
          monitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "monitor_fields_monitor_id_fkey"
            columns: ["monitor_id"]
            isOneToOne: false
            referencedRelation: "monitors"
            referencedColumns: ["id"]
          },
        ]
      }
      monitors: {
        Row: {
          checks_total: number | null
          checks_used: number | null
          country_code: string
          country_flag_url: string | null
          created_at: string | null
          id: string
          interval_minutes: number | null
          is_active: boolean | null
          item_id: string
          item_image_url: string | null
          item_title: string
          last_check_at: string | null
          modified_at: string | null
          name: string
          site_name: string
          unread_count: number | null
          user_id: string
        }
        Insert: {
          checks_total?: number | null
          checks_used?: number | null
          country_code: string
          country_flag_url?: string | null
          created_at?: string | null
          id?: string
          interval_minutes?: number | null
          is_active?: boolean | null
          item_id: string
          item_image_url?: string | null
          item_title: string
          last_check_at?: string | null
          modified_at?: string | null
          name: string
          site_name: string
          unread_count?: number | null
          user_id: string
        }
        Update: {
          checks_total?: number | null
          checks_used?: number | null
          country_code?: string
          country_flag_url?: string | null
          created_at?: string | null
          id?: string
          interval_minutes?: number | null
          is_active?: boolean | null
          item_id?: string
          item_image_url?: string | null
          item_title?: string
          last_check_at?: string | null
          modified_at?: string | null
          name?: string
          site_name?: string
          unread_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string | null
          metadata: Json | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          metadata?: Json | null
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          metadata?: Json | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_id: string | null
          act_english: string | null
          act_math: string | null
          act_reading: string | null
          act_science: string | null
          address_line1: string | null
          address_line2: string | null
          avatar_url: string | null
          bio: string | null
          birthdate: string | null
          ceeb_code: string | null
          citizenship_status: string | null
          city: string | null
          country: string | null
          created_at: string | null
          email: string
          facebook_url: string | null
          first_gen: boolean | null
          first_name: string | null
          full_name: string | null
          gender: string | null
          gpa: string | null
          grad_year: string | null
          high_school_name: string | null
          hispanic_latinx: boolean | null
          home_phone: string | null
          id: string
          intended_college_type: string | null
          intended_degree_type: string | null
          last_name: string | null
          linkedin_url: string | null
          no_tests: boolean | null
          phone: string | null
          preferred_contact: string | null
          primary_citizenship: string | null
          race: string | null
          religion: string | null
          rotc: string | null
          sat_ebrw: string | null
          sat_math: string | null
          sports: string | null
          state: string | null
          twitter_url: string | null
          updated_at: string | null
          username: string | null
          veteran: boolean | null
          zip: string | null
        }
        Insert: {
          account_id?: string | null
          act_english?: string | null
          act_math?: string | null
          act_reading?: string | null
          act_science?: string | null
          address_line1?: string | null
          address_line2?: string | null
          avatar_url?: string | null
          bio?: string | null
          birthdate?: string | null
          ceeb_code?: string | null
          citizenship_status?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          facebook_url?: string | null
          first_gen?: boolean | null
          first_name?: string | null
          full_name?: string | null
          gender?: string | null
          gpa?: string | null
          grad_year?: string | null
          high_school_name?: string | null
          hispanic_latinx?: boolean | null
          home_phone?: string | null
          id: string
          intended_college_type?: string | null
          intended_degree_type?: string | null
          last_name?: string | null
          linkedin_url?: string | null
          no_tests?: boolean | null
          phone?: string | null
          preferred_contact?: string | null
          primary_citizenship?: string | null
          race?: string | null
          religion?: string | null
          rotc?: string | null
          sat_ebrw?: string | null
          sat_math?: string | null
          sports?: string | null
          state?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          username?: string | null
          veteran?: boolean | null
          zip?: string | null
        }
        Update: {
          account_id?: string | null
          act_english?: string | null
          act_math?: string | null
          act_reading?: string | null
          act_science?: string | null
          address_line1?: string | null
          address_line2?: string | null
          avatar_url?: string | null
          bio?: string | null
          birthdate?: string | null
          ceeb_code?: string | null
          citizenship_status?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          facebook_url?: string | null
          first_gen?: boolean | null
          first_name?: string | null
          full_name?: string | null
          gender?: string | null
          gpa?: string | null
          grad_year?: string | null
          high_school_name?: string | null
          hispanic_latinx?: boolean | null
          home_phone?: string | null
          id?: string
          intended_college_type?: string | null
          intended_degree_type?: string | null
          last_name?: string | null
          linkedin_url?: string | null
          no_tests?: boolean | null
          phone?: string | null
          preferred_contact?: string | null
          primary_citizenship?: string | null
          race?: string | null
          religion?: string | null
          rotc?: string | null
          sat_ebrw?: string | null
          sat_math?: string | null
          sports?: string | null
          state?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          username?: string | null
          veteran?: boolean | null
          zip?: string | null
        }
        Relationships: []
      }
      schools: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          cover_image_url: string | null
          created_at: string | null
          degree_types: string[] | null
          description: string | null
          email: string | null
          id: string
          is_featured: boolean | null
          latitude: number | null
          logo_url: string | null
          longitude: number | null
          name: string
          phone: string | null
          rating: number | null
          review_count: number | null
          school_type: string | null
          slug: string | null
          state: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
          website_url: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          degree_types?: string[] | null
          description?: string | null
          email?: string | null
          id?: string
          is_featured?: boolean | null
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          name: string
          phone?: string | null
          rating?: number | null
          review_count?: number | null
          school_type?: string | null
          slug?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          website_url?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          degree_types?: string[] | null
          description?: string | null
          email?: string | null
          id?: string
          is_featured?: boolean | null
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          name?: string
          phone?: string | null
          rating?: number | null
          review_count?: number | null
          school_type?: string | null
          slug?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          website_url?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      spotlights: {
        Row: {
          button_text: string | null
          button_url: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          order_index: number | null
          pinned: boolean | null
          school_id: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          button_text?: string | null
          button_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          order_index?: number | null
          pinned?: boolean | null
          school_id?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          button_text?: string | null
          button_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          order_index?: number | null
          pinned?: boolean | null
          school_id?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "spotlights_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          created_at: string | null
          email: string
          id: string
          invited_at: string | null
          joined_at: string | null
          name: string | null
          permissions: Json | null
          role: string
          status: string | null
          team_owner_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          invited_at?: string | null
          joined_at?: string | null
          name?: string | null
          permissions?: Json | null
          role?: string
          status?: string | null
          team_owner_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          invited_at?: string | null
          joined_at?: string | null
          name?: string | null
          permissions?: Json | null
          role?: string
          status?: string | null
          team_owner_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      verification_requests: {
        Row: {
          admin_notes: string | null
          code_expires_at: string | null
          created_at: string | null
          document_urls: string[] | null
          id: string
          rejection_reason: string | null
          status: string | null
          updated_at: string | null
          user_id: string
          verification_code: string | null
          verification_data: Json | null
          verification_type: string
          verified_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          code_expires_at?: string | null
          created_at?: string | null
          document_urls?: string[] | null
          id?: string
          rejection_reason?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
          verification_code?: string | null
          verification_data?: Json | null
          verification_type: string
          verified_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          code_expires_at?: string | null
          created_at?: string | null
          document_urls?: string[] | null
          id?: string
          rejection_reason?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
          verification_code?: string | null
          verification_data?: Json | null
          verification_type?: string
          verified_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
