class CreateFlowers < ActiveRecord::Migration
  def change
    create_table :flowers do |t|
      t.string :name
      t.string :poem_type
      t.integer :fed_cap
      t.string :poem
      t.string :image
      t.string :location
      t.boolean :unlocked
      t.string :secret
      t.boolean :secret_unlocked
      t.boolean :secret_opt_out
      t.boolean :alive

      t.timestamps null: false
    end
  end
end
