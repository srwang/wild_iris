class AddReferenceToFlowers < ActiveRecord::Migration
  def change
  	add_reference :flowers, :user, index: true, foreign_key: true
  end
end
