USE [JobCannon];
GO

set identity_insert [Candidates] on
insert into Candidates (Id, FirstName, LastName, [Location], JobTitle) 
values (1, 'Charlie', 'Kelly', 'Philadelphia, PA', 'Wise Janitor');
insert into Candidates (Id, FirstName, LastName, [Location], JobTitle) 
values (2, 'Harvey', 'Slotnick', 'Saratoga Springs, NY', 'Foodie');
insert into Candidates (Id, FirstName, LastName, [Location], JobTitle) 
values (3, 'Ted', 'Lebaunge', 'Nashville, TN', 'Real Esate Mogul');
insert into Candidates (Id, FirstName, LastName, [Location], JobTitle) 
values (4, 'Mac', 'McDonald', 'Philadelphia, PA', 'Bodyguard');
insert into Candidates (Id, FirstName, LastName, [Location], JobTitle) 
values (5, 'Frank', 'Reynolds', 'Philadelphia, PA', 'Financier');
insert into Candidates (Id, FirstName, LastName, [Location], JobTitle) 
values (6, 'Dennis', 'Reynolds', 'Philadelphia, PA', 'Golden God');
set identity_insert [Candidates] off

set identity_insert [Employers] on
insert into Employers (Id, [Name], Industry, [Location]) 
values (1, 'Abstergo Industries', 'World Domination', 'Nashville, TN');
insert into Employers (Id, [Name], Industry, [Location]) 
values (2, 'Sterling Cooper', 'Advertising', 'New York, NY');
insert into Employers (Id, [Name], Industry, [Location]) 
values (3, '103.1 The WORM', 'Radio/Media', 'Nashville, TN');
insert into Employers (Id, [Name], Industry, [Location]) 
values (4, 'Spacers Choice', 'Universal Defense Logistics', 'Emerald Vale, Terra 2');
insert into Employers (Id, [Name], Industry, [Location]) 
values (5, 'Rizzos', 'Food Manufacturing', 'Cascadia, Monarch');
insert into Employers (Id, [Name], Industry, [Location]) 
values (6, 'Sublight Salvage', 'Transportation/Logistics', 'Cascadia, Monarch');
insert into Employers (Id, [Name], Industry, [Location]) 
values (7, 'Pied Piper', 'Tech', 'Silicon Valley, CA');
set identity_insert [Employers] off

set identity_insert [Users] on
insert into Users (Id, Email, FirebaseUserId, ImageUrl, Bio, CandidateId, EmployerId) 
values (1, 'charlie@paddyspub.comx', 'R6Kk8uF5HEZ1AN0zhZ8WBYU14Zj1', 'https://res.cloudinary.com/dhduglm4j/image/upload/v1596558133/techtok/bcbqqfhwt4hm9jfvkaup.jpg', 'Im proficient in many lines of work like, you know, basement stuff, cleaning urinals, uh, blood stuff, your basic slimes, your sludges, anything dead, or decay, you know - Im on it, Im dealing with it. The rest of the gang likes to call it Charlie work like its some sort of bad thing, but I actually enjoy the work I do! Cant get anyone else to do the job? Im your guy!', 1, NULL);
insert into Users (Id, Email, FirebaseUserId, ImageUrl, Bio, CandidateId, EmployerId) 
values (2, 'warren.vidic@abstergo.comx', 'z7QGQOMZA1O7gFq9eTmzCKiFfJh2', 'https://res.cloudinary.com/dhduglm4j/image/upload/v1596489955/Users/abstergo_m77gwf.jpg', 'The destruction of the Assassin Order, the procurement of advanced technologies originally created by the First Civilization, and establishing a New World Order is our primary goal. Then on Fridays, we have our Hawaiian shirt days. If you want to you can go ahead and wear a Hawaiian shirt and jeans.', NULL, 1);
insert into Users (Id, Email, FirebaseUserId, ImageUrl, Bio, CandidateId, EmployerId) 
values (3, 'rogersterling@sterlingcooper.comx', 'giiv9yPRUReOkavpgyWrHnBC7bF2', 'https://res.cloudinary.com/dhduglm4j/image/upload/v1596489955/Users/sterlingcooper_ridmxe.jpg', 'Sterling Cooper is committed to providing excellence in deliverance of results, public relations, and marketing to our clients by excelling in customer services and providing innovative marketing concepts.', NULL, 2);
insert into Users (Id, Email, FirebaseUserId, ImageUrl, Bio, CandidateId, EmployerId) 
values (4, 'harveyslotnick@gmail.comx', 'yLdkOOoxObRzP94goCJNIuroWex1', 'https://res.cloudinary.com/dhduglm4j/image/upload/v1596489955/Users/harvey_q0xyqv.jpg', 'There are only two things in life that a man needs to survive... a warm supper every night and a side-flask of Wild Turkey on hand at any given time. Ive both enjoyed and suffered through many-a warm supper, and even some cold ones, and Ive amassed a following over over 10 folks on the internet with my food blog Harvey Eats.', 2, NULL);
insert into Users (Id, Email, FirebaseUserId, ImageUrl, Bio, CandidateId, EmployerId) 
values (5, 'theworm@gmail.comx', 'p6ct9uMRmMMMD2LgtZ0pTzJNvHx1', 'https://res.cloudinary.com/dhduglm4j/image/upload/v1596489955/Users/theworm_r5ceym.png', 'Pabst man bun beard cronut actually. Tattooed chia polaroid dreamcatcher mlkshk kombucha. Chartreuse food truck blue bottle authentic migas +1. Shabby chic neutra chia, succulents celiac vinyl tbh direct trade tumeric unicorn. DIY 3 wolf moon forage cred tofu ugh cold-pressed helvetica cornhole. Flexitarian selvage swag wolf iceland.', NULL, 3);
insert into Users (Id, Email, FirebaseUserId, ImageUrl, Bio, CandidateId, EmployerId) 
values (6, 'tedlebaunge@gmail.comx', 'usbZp409K1PD7wqSxePjehCDDQI2', 'https://res.cloudinary.com/dhduglm4j/image/upload/v1596489955/Users/lebaunge_y1qy0h.jpg', 'I built my real estate empire on the holy trinity of affordability, reliability, and spaciousness offered by the unassuming split-level ranch. Now Im looking to bring my skills to your corral! Im Ted, and Im your next ace in the hole. Click that Lets Talk Button and well get to gettin!', 3, NULL);
insert into Users (Id, Email, FirebaseUserId, ImageUrl, Bio, CandidateId, EmployerId) 
values (7, 'hiring@spacerschoice.comx', 'd76K77VqiKbBc8Lh1OQHDYRh6TE3', 'https://res.cloudinary.com/dhduglm4j/image/upload/v1596506450/icons/spacerschoice_cxy8oi.png', 'When life gives you lemons, consider it a free trial from your friends at Spacers Choice!', NULL, 4);
insert into Users (Id, Email, FirebaseUserId, ImageUrl, Bio, CandidateId, EmployerId) 
values (8, 'hr@rizzos.comx', 'ud0MUomNn7SqdmPbDPZYk7krIVg2', 'https://res.cloudinary.com/dhduglm4j/image/upload/v1596569212/techtok/boepdlvpjauosmdxz6po.png', 'Woah, Woah, Woah, its Rizzos! Rizzos is a foodstuffs corporation based out of the Halcyon Colony. Their primary products are alcoholic drinks, cereals, and confectionery, such as Rizzos Lemon Slapp, Spectrum Vodka, and Purpleberry Bunch.', NULL, 5);
insert into Users (Id, Email, FirebaseUserId, ImageUrl, Bio, CandidateId, EmployerId) 
values (9, 'mac@paddyspub.comx', 'eUTqDHAA7TMs5fAWifd1bDKBGRq2', 'https://res.cloudinary.com/dhduglm4j/image/upload/v1596815789/techtok/h00ybg8pdvs1ztvbbkp8.jpg', 'I do backflips every single day of my life.', 4, NULL);
insert into Users (Id, Email, FirebaseUserId, ImageUrl, Bio, CandidateId, EmployerId) 
values (10, 'sublight@sublightsalvage.comx', 'ABoFpCaidISqUVZngTO23Zxl1mH3', 'https://res.cloudinary.com/dhduglm4j/image/upload/v1596815630/techtok/eek8hqkxlsjjfnirsw3e.png', 'Sublight Salvage and Shipping is a corporation which operates from the Groundbreaker. Sublight is a network of salvagers with business ties to transportation and waste disposal. A tangled web of contractors and secretive vice presidents make up our official hierarchy, leaving no one to speak on the record about Sublights more legally dubious activities.', NULL, 6);
insert into Users (Id, Email, FirebaseUserId, ImageUrl, Bio, CandidateId, EmployerId) 
values (11, 'frank@paddyspub.comx', 'rRbP6ITWQsgqt2cPURxFN78xkNJ2', 'https://res.cloudinary.com/dhduglm4j/image/upload/v1596815885/techtok/srou9uau8gxgzc6zzubc.jpg', 'A few days ago, three thugs tried to mug me. And I want to be very clear about something. These pieces of garbage, they dont know who the hell theyre dealing with. I dont know if they wanted money or they wanted something more sexual. But its a lucky thing I had my pieces. Anyway, I started blasting. Bah! Bah! Now, I dont see so good, so I missed, then they ran away, I ran after them. Bang! Tried to shoot them in the back, but I dont run so good either. Anyway, you guys all think Im a hero, and Ill accept that responsibility.', 5, NULL);
insert into Users (Id, Email, FirebaseUserId, ImageUrl, Bio, CandidateId, EmployerId) 
values (12, 'richard@piedpiper.com', 'jvfEIGCZ8fSmOi04Dcq0Ojx7MJU2', 'https://res.cloudinary.com/dhduglm4j/image/upload/v1596816363/techtok/zwl5gb8tentnej7hcipp.png', 'The company was started when Richard Hendricks, a software engineer who was working at Hooli, created a songwriter-oriented music app called Pied Piper that made it easier for songwriters to determine if their work infringed on others copyright.', NULL, 7);
insert into Users (Id, Email, FirebaseUserId, ImageUrl, Bio, CandidateId, EmployerId) 
values (13, 'dennis@paddyspub.comx', 'cmhDfdraShZIUn8FH6V794j2SWD3', 'https://res.cloudinary.com/dhduglm4j/image/upload/v1596824382/techtok/af2j3msotmr4sx3ax3ng.jpg', 'I am the golden god.', 6, NULL);
set identity_insert [Users] off

set identity_insert [Chats] on
insert into Chats (Id, InitiatingUserId, ReciprocatingUserId, MutualInterest) 
values (1, 1, 2, 1);
insert into Chats (Id, InitiatingUserId, ReciprocatingUserId, MutualInterest) 
values (2, 1, 3, 1);
insert into Chats (Id, InitiatingUserId, ReciprocatingUserId, MutualInterest) 
values (3, 1, 5, 0);
insert into Chats (Id, InitiatingUserId, ReciprocatingUserId, MutualInterest) 
values (4, 2, 11, 1);
insert into Chats (Id, InitiatingUserId, ReciprocatingUserId, MutualInterest) 
values (5, 7, 1, 0);
insert into Chats (Id, InitiatingUserId, ReciprocatingUserId, MutualInterest) 
values (6, 1, 7, NULL);
set identity_insert [Chats] off

set identity_insert [Messages] on
insert into [Messages] (Id, ChatId, UserId, Content)
values (1, 1, 2, 'Are you ready to join the Templar Brotherhood and rid the world of the Assassins order? Lets grab coffee next week.');
insert into [Messages] (Id, ChatId, UserId, Content)
values (2, 1, 1, 'Yes! I would be more than happy to meet next week to hear about your plans for world domination!');
insert into [Messages] (Id, ChatId, UserId, Content)
values (3, 1, 2, 'Excellent! How about we meet in our global HQ on Tuesday @ 2pm?');
insert into [Messages] (Id, ChatId, UserId, Content)
values (4, 2, 1, 'Whats up Roggy boi?');
insert into [Messages] (Id, ChatId, UserId, Content)
values (5, 1, 1, 'before I decide, can you elaborate on your company spaghetti policy? Cant be too careful, you know?');
insert into [Messages] (Id, ChatId, UserId, Content)
values (6, 1, 2, 'Our spaghetti policy...?');
insert into [Messages] (Id, ChatId, UserId, Content)
values (7, 1, 1, 'Yes, what is your stance on spaghetti in the office? And while were at it, why dont we cover the crow egg policy?');
insert into [Messages] (Id, ChatId, UserId, Content)
values (8, 1, 2, 'Well Charlie, I dont see any issue with spaghetti so long as its consumed in the breakroom during your allotted half hour lunch break');
insert into [Messages] (Id, ChatId, UserId, Content)
values (9, 1, 2, 'But crows eggs? Im going to have to check with my supervisor on that one...');
insert into [Messages] (Id, ChatId, UserId, Content)
values (10, 4, 11, 'I just parted ways with my old crew, and Im looking for a new one. Im a financier of fun things like schemes and pranks and such.');
set identity_insert [Messages] off

set identity_insert [Jobs] on
insert into Jobs (Id, EmployerId, PostDate, Jobtitle, JobLocation, Salary, Rate, Requirements, JobSummary, [Type], Keyword1, Keyword2, Keyword3)
values (1, 7, 1613696947, 'Saltuna Canner', 'Edgewater, Terra 2', '15', 'Hr', 'Must be a warm body with a pulse', 'The Saltuna Cannery is Edgewaters main source of employment. The factory is suffering from supply problems since much of the saltuna came from Stellar Bay. In order to continue providing food to the city, the factory has begun mixing the saltuna with minerals and crushed stones.', 'Part-Time', 'assembly', 'tools', 'tuna');
insert into Jobs (Id, EmployerId, PostDate, Jobtitle, JobLocation, Salary, Rate, Requirements, JobSummary, [Type], Keyword1, Keyword2, Keyword3)
values (2, 2, 1613696947, 'Game Tester', 'Montreal, Quebec', '25000', 'Sal', 'Must demonstrate ability to blindly follow orders', 'Echo park dreamcatcher food truck kitsch. Readymade kogi humblebrag, waistcoat pop-up cronut helvetica asymmetrical butcher cliche literally salvia church-key XOXO. Vexillologist bespoke tacos retro palo santo lyft. 90s bitters pour-over, sustainable cred biodiesel aesthetic iPhone try-hard celiac.', 'Part-Time', 'gaming', 'testing', 'sleeping' );
insert into Jobs (Id, EmployerId, PostDate, Jobtitle, JobLocation, Salary, Rate, Requirements, JobSummary, [Type], Keyword1, Keyword2, Keyword3)
values (3, 7, 1613696947, 'Factory Security Manager', 'Emerald Vale Saltuna Factory', '25000', 'Sal', '- Deadly with a variety of Spacers Choice weapons. 5 years experience managing a team of at least 4 security officers Preference given to any candidate that can recite the Spacers Choice jingle on command.', 'Our prestigious Saltuna factory on Terra 2 has an immediate opening for a Factory Security Manager! Due to increased turnover for reasons beyond our control, were prepared to make an offer today. Duties include:\n- protecting the saltuna factory from local traitor factions. Submitting daily incident reports Ensuring factory workers are reaching their daily quotas Patrolling grounds around factory If you think youre the right fit for Spacers Choice, apply today!', 'Full-Time', 'Weapons', 'Microsoft Word', 'Sandwiches');
insert into Jobs (Id, EmployerId, PostDate, Jobtitle, JobLocation, Salary, Rate, Requirements, JobSummary, [Type], Keyword1, Keyword2, Keyword3)
values (4, 7, 1613696947, 'Moon Man', 'The Groundbreaker', '15', 'Hr', 'Must be able to spend 24/7 wearing Spacers Choice moon man mask. Must be friendly. Must have experience with Spacers Choice products.', 'Im baby paleo edison bulb street art iceland woke polaroid four loko church-key YOLO williamsburg try-hard subway tile. Everyday carry lyft meditation pork belly vegan austin asymmetrical YOLO literally four dollar toast franzen keffiyeh subway tile plaid squid. Readymade selfies palo santo plaid. Butcher mlkshk vegan shoreditch fam synth deep v trust fund photo booth roof party tattooed knausgaard microdosing. Vexillologist enamel pin next level, austin iceland disrupt plaid XOXO wolf.Authentic schlitz pickled, viral hexagon pop-up kogi hot chicken jianbing man bun meggings skateboard. Deep v brooklyn copper mug, 3 wolf moon semiotics sriracha raclette waistcoat sustainable pitchfork 8-bit yuccie vaporware chia. Twee bitters leggings helvetica cornhole enamel pin brunch lumbersexual asymmetrical occupy pork belly. Whatever ethical knausgaard shabby chic, ramps church-key chartreuse edison bulb pork belly tumblr mixtape before they sold out williamsburg pug gentrify. Waistcoat iceland next level, chartreuse XOXO everyday carry swag snackwave DIY. Echo park offal forage cred biodiesel distillery. Leggings semiotics disrupt etsy dreamcatcher mumblecore tacos. Mixtape try-hard salvia, bespoke hot chicken occupy fingerstache. Hammock air plant artisan sartorial, glossier banjo pitchfork. Portland gastropub seitan palo santo franzen. Plaid marfa etsy crucifix affogato vexillologist echo park locavore cronut.', 'Full-Time', 'Mask', 'Obedience', 'Sales');
set identity_insert [Jobs] off

set identity_insert [WorkHistory] on
insert into WorkHistory (Id, UserId, JobTitle, Company, [Location], StartMonth, EndMonth, StartYear, EndYear, [Current], [Description])
values (3, 1, 'Fight Milk Sales Rep', 'Franks Fluids', 'Philadelphia, PA', 'June', 'June', 2015, 2015, 0, 'Oh man, can I tell you about Fight Milk? Im dying to tell you about Fight Milk! Fight Milk is the only drink made for bodyguards, by bodyguards. Mac and I got a couple of the UFC guys to drink it exclusively, and we almost became the official drink sponsor for the UFC!');
insert into WorkHistory (Id, UserId, JobTitle, Company, [Location], StartMonth, EndMonth, StartYear, EndYear, [Current], [Description])
values (4, 4, 'Wild Card', 'Paddys Pub', 'Philadelphia, PA', 'January', '', 2012, NULL, 1, 'Im proficient in many lines of work like, you know, basement stuff, cleaning urinals, uh, blood stuff, your basic slimes, your sludges, anything dead, or decay, you know - Im on it, Im dealing with it. The rest of the gang likes to call it Charlie work like its some sort of bad thing, but I actually enjoy the work I do! Cant get anyone else to do the job? Im your guy!');
set identity_insert [WorkHistory] off

set identity_insert [Skills] on
insert into Skills (Id, UserId, Skill1, Skill2, Skill3, Skill4, Skill5, Skill6, Skill7, Skill8, Skill9, Skill10)
values (1, 1, 'Cleaning', 'Slimes', 'Sludges', 'Ghouls', 'Litigation', 'Crows eggs', 'Boiling denim', 'Crabs', 'Milksteak', 'Denim Chicken');
set identity_insert [Skills] off

set identity_insert [Schools] on
insert into Schools (Id, UserId, SchoolName, Field, Degree, StartMonth, EndMonth, StartYear, EndYear, [Current])
values (1, 1, 'Uncle Jacks Institute of Law', 'Bird Law', 'J.D.', 'September', 'October', 2011, 2015, 0);
insert into Schools (Id, UserId, SchoolName, Field, Degree, StartMonth, EndMonth, StartYear, EndYear, [Current])
values (2, 1, 'Janitor School', 'Sweeping', 'Certification', 'January');
set identity_insert [Schools] off