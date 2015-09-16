# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Rainwater.create({total_amount: 500, user_id: 1});

Flower.create({name: "Red Poppy", poem_type: "flower", fed_cap: 100, poem: "The great thing\nis not having\na mind. Feelings:\noh, I have those; they\ngovern me. I have\na lord in heaven\ncalled the sun, and open\nfor him, showing him\nthe fire of my own heart, fire\nlike his presence.\nWhat could such glory be\nif not a heart? Oh my brothers and sisters,\nwere you like me once, long ago,\nbefore you were human? Did you\npermit yourselves\nto open once, who would never\nopen again? Because in truth\nI am speaking now\nthe way you do. I speak\nbecause I am shattered.", image: "http://cdn18.theglobalherald.com/wp-content/uploads/2010/11/poppy-scotland.png", location: "hell", unlocked: false});

Flower.create({name: "Wild Iris", poem_type: "flower", fed_cap: 150, poem: "At the end of my suffering\nthere was a door.\nHear me out: that which you call death\nI remember.\nOverhead, noises, branches of the pine shifting.\nThen nothing. The weak sun\nflickered over the dry surface.\nIt is terrible to survive\nas consciousness\nburied in the dark earth.\nThen it was over: that which you fear, being\na soul and unable\nto speak, ending abruptly, the stiff earth\nbending a little. And what I took to be\nbirds darting in low shrubs.\nYou who do not remember\npassage from the other world\nI tell you I could speak again: whatever\nreturns from oblivion returns\nto find a voice:\n\nfrom the center of my life came\na great fountain, deep blue\nshadows on azure seawater.", image: "http://cdn18.theglobalherald.com/wp-content/uploads/2010/11/poppy-scotland.png", location: "hell", unlocked: false, user_id: 1});

Flower.create({name: "Snowdrops", poem_type: "flower", fed_cap: 150, poem: "Forgive me if I say I love you: the powerful\nare always lied to since the weak are always\ndriven by panic. I cannot love\nwhat I can’t conceive, and you disclose\nvirtually nothing: are you like the hawthorn tree,\nalways the same thing in the same place,\nor are you more the foxglove, inconsistent, first springing up\na pink spike on the slope behind the daisies,\nand the next year, purple in the rose garden? You must see\nit is useless to us, this silence that promotes belief\nyou must be all things, the foxglove and the hawthorn tree,\nthe vulnerable rose and tough daisy—we are left to think\nyou couldn’t possibly exist.  Is this\nwhat you mean us to think, does this explain\nthe silence of the morning,\nthe crickets not yet rubbing their wings, the cats\nnot fighting in the yard?", image: "http://cdn18.theglobalherald.com/wp-content/uploads/2010/11/poppy-scotland.png", location: "purgatory", unlocked: false, user_id: 1});
