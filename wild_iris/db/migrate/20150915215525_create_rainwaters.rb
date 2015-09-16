class CreateRainwaters < ActiveRecord::Migration
  def change
    create_table :rainwaters do |t|
      t.integer :total_amount

      t.timestamps null: false
    end
  end
end
