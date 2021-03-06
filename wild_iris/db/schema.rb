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

ActiveRecord::Schema.define(version: 20150916164543) do

  create_table "flowers", force: :cascade do |t|
    t.string   "name"
    t.string   "poem_type"
    t.integer  "fed_cap"
    t.string   "poem"
    t.string   "image"
    t.string   "location"
    t.boolean  "unlocked"
    t.string   "secret"
    t.boolean  "secret_unlocked"
    t.boolean  "secret_opt_out"
    t.boolean  "alive"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "user_id"
  end

  add_index "flowers", ["user_id"], name: "index_flowers_on_user_id"

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "password_digest"
    t.integer  "level"
    t.integer  "rainwater"
    t.boolean  "allunlocked"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end
