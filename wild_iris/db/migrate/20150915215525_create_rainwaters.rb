class CreateRainwaters < ActiveRecord::Migration
  def change
    create_table :rainwaters do |t|
      t.integer :total_amount
      t.integer :amount_collected

      t.timestamps null: false
    end
  end
end
