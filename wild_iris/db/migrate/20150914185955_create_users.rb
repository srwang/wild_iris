class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :password
      t.integer :level
      t.integer :rainwater
      t.boolean :won

      t.timestamps null: false
    end
  end
end
