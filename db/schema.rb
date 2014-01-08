# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140108002150) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "authentications", force: true do |t|
    t.integer  "user_id"
    t.string   "provider"
    t.string   "uid"
    t.string   "token"
    t.string   "token_secret"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "authentications", ["uid"], :name => "index_authentications_on_uid"
  add_index "authentications", ["user_id"], :name => "index_authentications_on_user_id"

  create_table "comments", force: true do |t|
    t.integer  "user_id"
    t.integer  "establishment_id"
    t.string   "body"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["establishment_id"], :name => "index_comments_on_establishment_id"
  add_index "comments", ["user_id", "establishment_id"], :name => "index_comments_on_user_id_and_establishment_id"
  add_index "comments", ["user_id"], :name => "index_comments_on_user_id"

  create_table "endorsements", force: true do |t|
    t.integer  "user_id"
    t.integer  "establishment_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "endorsements", ["establishment_id"], :name => "index_endorsements_on_establishment_id"
  add_index "endorsements", ["user_id", "establishment_id"], :name => "index_endorsements_on_user_id_and_establishment_id", :unique => true
  add_index "endorsements", ["user_id"], :name => "index_endorsements_on_user_id"

  create_table "establishments", force: true do |t|
    t.text     "name"
    t.spatial  "latlng",            limit: {:srid=>4326, :type=>"point", :geographic=>true}
    t.string   "formatted_address"
    t.string   "street_number"
    t.string   "street"
    t.string   "neighborhood"
    t.string   "city"
    t.string   "state"
    t.string   "country"
    t.string   "zip_code"
    t.string   "phone"
    t.integer  "price"
    t.string   "website"
    t.string   "google_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "slug"
  end

  add_index "establishments", ["formatted_address"], :name => "index_establishments_on_formatted_address"
  add_index "establishments", ["google_id"], :name => "index_establishments_on_google_id", :unique => true
  add_index "establishments", ["latlng"], :name => "index_establishments_on_latlng", :spatial => true
  add_index "establishments", ["name"], :name => "index_establishments_on_name"
  add_index "establishments", ["neighborhood"], :name => "index_establishments_on_neighborhood"
  add_index "establishments", ["price"], :name => "index_establishments_on_price"
  add_index "establishments", ["slug"], :name => "index_establishments_on_slug", :unique => true

  create_table "friendly_id_slugs", force: true do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], :name => "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", :unique => true
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], :name => "index_friendly_id_slugs_on_slug_and_sluggable_type"
  add_index "friendly_id_slugs", ["sluggable_id"], :name => "index_friendly_id_slugs_on_sluggable_id"
  add_index "friendly_id_slugs", ["sluggable_type"], :name => "index_friendly_id_slugs_on_sluggable_type"

  create_table "hours", force: true do |t|
    t.integer  "open_day"
    t.integer  "close_day"
    t.integer  "open_time"
    t.integer  "close_time"
    t.integer  "establishment_id"
    t.integer  "open_in_minutes"
    t.integer  "close_in_minutes"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "hours", ["close_in_minutes"], :name => "index_hours_on_close_in_minutes"
  add_index "hours", ["establishment_id", "close_in_minutes"], :name => "index_hours_on_establishment_id_and_close_in_minutes", :unique => true
  add_index "hours", ["establishment_id", "open_in_minutes"], :name => "index_hours_on_establishment_id_and_open_in_minutes", :unique => true
  add_index "hours", ["establishment_id"], :name => "index_hours_on_establishment_id"
  add_index "hours", ["open_in_minutes"], :name => "index_hours_on_open_in_minutes"

  create_table "photos", force: true do |t|
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "caption"
    t.integer  "user_id"
    t.integer  "establishment_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "photos", ["establishment_id"], :name => "index_photos_on_establishment_id"
  add_index "photos", ["user_id", "establishment_id"], :name => "index_photos_on_user_id_and_establishment_id"
  add_index "photos", ["user_id"], :name => "index_photos_on_user_id"

  create_table "relationships", force: true do |t|
    t.integer  "follower_id"
    t.integer  "followed_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "relationships", ["followed_id"], :name => "index_relationships_on_followed_id"
  add_index "relationships", ["follower_id", "followed_id"], :name => "index_relationships_on_follower_id_and_followed_id", :unique => true
  add_index "relationships", ["follower_id"], :name => "index_relationships_on_follower_id"

  create_table "users", force: true do |t|
    t.string   "username"
    t.string   "slug"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.boolean  "admin",                  default: false
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.integer  "failed_attempts",        default: 0,     null: false
    t.string   "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "provider"
    t.string   "uid"
    t.string   "token"
  end

  add_index "users", ["confirmation_token"], :name => "index_users_on_confirmation_token", :unique => true
  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["first_name"], :name => "index_users_on_first_name"
  add_index "users", ["last_name"], :name => "index_users_on_last_name"
  add_index "users", ["provider"], :name => "index_users_on_provider"
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true
  add_index "users", ["slug"], :name => "index_users_on_slug", :unique => true
  add_index "users", ["token"], :name => "index_users_on_token"
  add_index "users", ["uid"], :name => "index_users_on_uid"
  add_index "users", ["unlock_token"], :name => "index_users_on_unlock_token", :unique => true
  add_index "users", ["username"], :name => "index_users_on_username", :unique => true

end
