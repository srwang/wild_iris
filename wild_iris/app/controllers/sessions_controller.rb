class SessionsController < ApplicationController

    def index
        render :index
    end

    def create 
        user = User.find_by({username: params[:username]})
        if user && user.authenticate(params[:password])
            	session[:user_id] = user.id
                redirect_to '/'
        else
            flash[:error] = "Incorrect Username or Password"
            redirect_to(:back)
        end

    end

    def new
        puts session[:user_id]
        if params[:password] == params[:password_confirmation]
            if User.create({username: params[:username], password: params[:password], level: 1, rainwater: 300, allunlocked: false}).valid?
                user = User.find_by({username: params[:username]})
                session[:user_id] = user.id

                Flower.create({name: "Red Poppy", poem_type: "flower", fed_cap: 100, poem: "The great thing\nis not having\na mind. Feelings:\noh, I have those; they\ngovern me. I have\na lord in heaven\ncalled the sun, and open\nfor him, showing him\nthe fire of my own heart, fire\nlike his presence.\nWhat could such glory be\nif not a heart? Oh my brothers and sisters,\nwere you like me once, long ago,\nbefore you were human? Did you\npermit yourselves\nto open once, who would never\nopen again? Because in truth\nI am speaking now\nthe way you do. I speak\nbecause I am shattered.", image: "/assets/poppy.png", location: "hell", unlocked: false, user_id: session[:user_id], secret: "permit", secret_unlocked: false, secret_opt_out: false, alive: true});

                Flower.create({name: "Wild Iris", poem_type: "flower", fed_cap: 150, poem: "At the end of my suffering\nthere was a door.\n\nHear me out: that which you call death\nI remember.\n\nOverhead, noises, branches of the pine shifting.\nThen nothing. The weak sun\nflickered over the dry surface.\n\nIt is terrible to survive\nas consciousness\nburied in the dark earth.\n\nThen it was over: that which you fear, being\na soul and unable\nto speak, ending abruptly, the stiff earth\nbending a little. And what I took to be\nbirds darting in low shrubs.\n\nYou who do not remember\npassage from the other world\nI tell you I could speak again: whatever\nreturns from oblivion returns\nto find a voice:\n\nfrom the center of my life came\na great fountain, deep blue\nshadows on azure seawater.", image: "/assets/iris.png", location: "hell", unlocked: false, user_id: session[:user_id], secret: "noises", secret_unlocked: false, secret_opt_out: false, alive: true});

                Flower.create({name: "Matins", poem_type: "landscape", fed_cap: 150, poem: "Forgive me if I say I love you: the powerful\nare always lied to since the weak are always\ndriven by panic. I cannot love\nwhat I can’t conceive, and you disclose\nvirtually nothing: are you like the hawthorn tree,\nalways the same thing in the same place,\nor are you more the foxglove, inconsistent, first springing up\na pink spike on the slope behind the daisies,\nand the next year, purple in the rose garden? You must see\nit is useless to us, this silence that promotes belief\nyou must be all things, the foxglove and the hawthorn tree,\nthe vulnerable rose and tough daisy—we are left to think\nyou couldn’t possibly exist. Is this\nwhat you mean us to think, does this explain\nthe silence of the morning,\nthe crickets not yet rubbing their wings, the cats\nnot fighting in the yard?", image: "/assets/matins.png", location: "purgatory", unlocked: true, user_id: session[:user_id], secret: "", secret_unlocked: true, secret_opt_out: false, alive: true});

                Flower.create({name: "Matins", poem_type: "landscape", fed_cap: 75, poem: "Unreachable father, when we were first\nexiled from heaven, you made\na replica, a place in one sense\ndifferent from heaven, being\ndesigned to teach a lesson: otherwise\nthe same-beauty on either side, beauty\nwithout alternative- Except\nwe didn't know what was the lesson. Left alone,\nwe exhausted each other. Years\nof darkness followed; we took turns\nworking the garden, the first tears\nfilling our eyes as earth\nmisted with petals, some\ndark red, some flesh colored-\nWe never thought of you, whom we were learning to worship.\nWe merely knew it wasn't human nature to love\nonly what returns love.", image:"/assets/matins.png", location: "purgatory", unlocked: true, user_id: session[:user_id], secret: "", secret_unlocked: false, secret_opt_out: false, alive: true});

                Flower.create({name: "Lamium", poem_type: "flower", fed_cap: 100, poem: "This is how you live when you have a cold heart.\nAs I do: in shadows, trailing over cool rock,\nunder the great maple trees.\n\nThe sun hardly touches me.\nSometimes I see it in early spring, rising very far away.\nThen leaves grow over it, completely hiding it. I feel it\nglinting through the leaves, erratic,\nlike someone hitting the side of a glass with a metal spoon.\n\nLiving things don't all require\nlight in the same degree. Some of us\nmake our own light: a silver leaf\nlike a path no one can use, a shallow\nlake of silver in the darkness under the great maples.\n\nBut you know this already.\nYou and the others who think\nyou live for truth and, by extension, love\nall that is cold.", image:"/assets/lamium.png", location: "purgatory", unlocked: false, user_id: session[:user_id], secret: "glinting", secret_unlocked: false, secret_opt_out: false, alive: true});

                Flower.create({name: "Snowdrops", poem_type: "flower", fed_cap: 125, poem: "Do you know what I was, how I lived? You know\nwhat despair is; then\nwinter should have meaning for you.\n\nI did not expect to survive,\nearth suppressing me. I didn't expect\nto waken again, to feel\nin damp earth my body\nable to respond again, remembering\nafter so long how to open again\nin the cold light\nof earliest spring-\n\nafraid, yes, but among you again\ncrying yes risk joy\n\nin the raw wind of the new world.", image: "/assets/snowdrops.png", location: "purgatory", unlocked: false, user_id: session[:user_id], secret: "winter", secret_unlocked: false, secret_opt_out: false, alive: true});

                Flower.create({name: "Spring Snow", poem_type: "landscape", fed_cap: 0, poem: "Look at the night sky:\nI have two selves, two kinds of power.\n\nI am here with you, at the window,\nwatching you react. Yesterday\nthe moon rose over moist earth in the lower garden.\nNow the earth glitters like the moon,\nlike dead matter crusted with light.\n\nYou can close your eyes now.\nI have heard your cries, and cries before yours,\nand the demands behind them.\nI have shown you what you want:\nnot belief, but capitulation\nto authority, which depends on violence.", image: "/assets/snow.png", location: "sky", unlocked: true, user_id: session[:user_id], secret: "capitulation", secret_unlocked: true, secret_opt_out: false, alive: true});

                Flower.create({name: "Witchgrass", poem_type: "landscape", fed_cap: 0, poem: "Something\ncomes into the world unwelcome\ncalling disorder, disorder-\n\nIf you hate me so much\ndon't bother to give me\na name: do you need\none more slur\nin your language, another\nway to blame\none tribe fore everything-\n\nas we both know,\nif you worship\none god, you only need\none enemy-\n\nI'm not the enemy.\nOnly a ruse to ignore\nwhat you see happening\nright here in this bed,\na little paradigm\nof failure. One of your precious flowers\ndies here almost every day\nand you can't rest until\nyou attack the cause, meaning\nwhatever is left, whatever\nhappens to be sturdier\nthan your personal passion-\n\nIt was not meant\nto last forever in the real world.\nBut why admit that, when you can go on\ndoing what you always do,\nmourning and laying blame,\nalways the two together.\n\nI don't need your praise\nto survive. I was here first,\nbefore you were here, before\nyou ever planted a garden.\nAnd I'll be here when only the sun and moon\nare left, and the sea, and the wide field.\n\nI will constitute the field.", image: "/assets/witchgrass.png", location: "earth", unlocked: true, user_id: session[:user_id], secret: "", secret_unlocked: false, secret_opt_out: false, alive: true})

                Flower.create({name: "The White Rose", poem_type: "flower", fed_cap: 175, poem: "This is the earth? Then\nI don't belong here.\n\nWho are you in the lighted window,\nshadowed now by the flickering leaves\nof the wayfarer tree?\nCan you survive where I won't last\nbeyond the first summer?\n\nAll night the slender branches of the tree\nshift and rustle at the bright window.\nExplain my life to me, you who make no sign,\n\nthough I call out to you in the night:\nI am not like you, I have only\nmy body for a voice; I can't\ndisappear into silence-\n\nAnd in the cold morning\nover the dark surface of the earth\nechoes of my voice drift,\nwhiteness steadily absorbed into darkness\n\nas though you were making a sign after all\nto convince me you too couldn't survive here\n\nor to show me you are not the light I called to\nbut the blackness behind it.", image: "/assets/rose.png", location: "hell", unlocked: false, user_id: session[:user_id], secret: "voice", secret_unlocked: false, secret_opt_out: false, alive: true})

                Flower.create({name: "Clear Morning", poem_type: "landscape", fed_cap: 0, poem: "I've watched you long enough,\nI can speak to you any way I like-\n\nI've submitted to your preferences, observing patiently\nthe things you love, speaking\n\nthrough vehicles only, in\ndetails of earth, as you prefer,\ntendrils\nof blue clematis, light\n\nof early evening-\nyou would never accept\n\na voice like mine, indifferent\nto the object you busily name,\n\nyour mouths\nsmall circles of awe-\n\nAnd all this time\nI indulged your limitation, thinking\n\nyou would cast it aside yourselves sooner or later,\nthinking matter could not absorb your gaze forever-\n\nobstacle of the clematis painting\nblue flowers on the porch window-\n\nI cannot go on\nrestricting myself to images\n\nbecause you think it is your right\nto dispute my meaning:\n\nI am prepared now to force\nclarity upon you.", image: "/assets/snow.png", location: "sky", unlocked: true, user_id: session[:user_id], secret: "", secret_unlocked: true, secret_opt_out: false, alive: true})

                Flower.create({name: "Violets", poem_type: "flower", fed_cap: 75, poem: "Because in our world\nsomething is always hidden,\nsmall and white,\nsmall and what you call\npure, we do not grieve\nas you grieve, dear\nsuffering master; you\nare no more lost\nthan we are, under\nthe hawthorn tree, the hawthorn holding\nbalanced trays of pearls: what\nhas brought you among us\nwho would teach you, though\nyou kneel and weep,\nclasping your great hands,\nin all your greatness knowing\nnothing of the soul's nature,\nwhich is never to die: poor sad god,\neither you never have one\nor you never lose one.", image: "/assets/violets.png", location: "purgatory", unlocked: false, user_id: session[:user_id], secret: "lost", secret_unlocked: false, secret_opt_out: false, alive: true})

                Flower.create({name: "Trillium", poem_type: "flower", fed_cap: 200, poem: "When I woke up I was in a forest. The dark\nseemed natural, the sky through the pine trees\nthick with many lights.\n\nI knew nothing; I could do nothing but see.\nAnd as I watched, all the lights of heaven\nfaded to make a single thing, a fire\nburning through the cool firs.\nThen it wasn't possible any longer\nto stare at heaven and not be destroyed.\n\nAre there souls that need\ndeath's presence, as I require protection?\nI think if I speak long enough\nI will answer that question, I will see\nwhatever they see, a ladder\nreaching through the firs, whatever\ncalls them to exchange their lives-\n\nThink what I understand already.\nI woke up ignorant in a forest;\nonly a moment ago, I didn't know my voice\nif one were given me\nwould be so full of grief, my sentences\nlike cries strung together.\nI didn't even know I felt grief\nuntil that word came, until I felt\nrain streaming from me.", image: "/assets/trillium.png", location: "purgatory", unlocked: false, user_id: session[:user_id], secret: "presence", secret_unlocked: false, secret_opt_out: false, alive: true})
                
                redirect_to '/'
            else 
                flash[:error_two] = "Sorry, #{params[:username]} has been taken"
                redirect_to(:back) 
            end
        else 
            flash[:error_two] = "Please confirm your password"
            redirect_to(:back) 
        end
    end

    def destroy 
        cookies[:allUnlocked] = nil
        session[:user_id] = nil
        redirect_to '/sessions'
    end 

end

