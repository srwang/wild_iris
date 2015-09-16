class AddReferenceToRainwaters < ActiveRecord::Migration
  def change
  	add_reference :rainwaters, :user, index: true, foreign_key: true
  end
end
