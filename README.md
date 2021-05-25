# JobCannon

JobCannon is a React app that uses a SQL database and C#/.NET on the backend. This app allows users to register as a job seeker or employer and peruse a list of registered employers or job seekers, respectively. The discovery feature allows them to match based on mutual interest, which then opens a new set of options between matched users.

Matched users can subsequently engage in a private chat with one another. Employers can view matched job seekers' resumes and job seekers can view matched employers' job listings. Either user also has the option to unmatch with the user at any given time, update their profile details, delete their profile, or add, update, or delete job listings/resume fields.

The backend was written in C#, and references a SQL database through their respective models. The controller files will utilize the correct methods obtain data from a repository when a user takes such an action on the DOM. The front end is linked through these multiple endpoints using javascript fetch calls, and interpolated to the DOM. Most of these calls are broadly capturing the objects, but future iterations of this app will see them become more granular to fetch only the necessary data.

## Two User Types

**Job Seeker Users** 
- Have access to, and the ability to match with EMPLOYER profiles on the `Discovery` page. 
- The `Resume` tab opens a resume building feature for the user to post, edit, or delete work history, skills, and schools on their resume. 
- The `Job Listings` tab opens a list of companies they are matched with which, when clicked, open up a list of the employer users current job listings.

**Employer Users** 
- Have access to, and the ability to match with CANDIDATE profiles on the `Discovery` page. 
- The `Resume` tab opens a list of job seekers that the employer is matched with which, when clicked, opens a particular user's resume. 
- The `Job Listings` tab opens the job listing feature where the employer can post, edit, and delete job listings.

**Common Features**
- The `Chat` tab opens a list of all the user's current matches with a private chat. Opening a particular user's chat lets them post new messages.
- In the `Chat` feature, the active user can open the other user's profile by clicking on their profile icon next to their message. This displays that user's profile, and an "Unmatch" button that deletes the match and chat.
- The `Profile` tab opens up the active user's profile with the ability to edit profile details (including profile picture upload) or delete the entire account.

## Screenshots

<img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1618952347/discovery_ooimgr.png" height="303" width="133"><img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1618952347/chats_bhjhq4.png" height="303" width="133"><img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1618952347/chat-private_ga14uj.png" height="303" width="133">

<img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1597609608/techtok/resume-sample_cfitg4.png" height="303" width="133"><img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1618952347/job-listings_lbota6.png" height="303" width="133"><img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1618952256/Job-Listing-Creater_dkdeax.png" height="303" width="133">

## Installation

- In your terminal run git clone SSH KEY
- run `npm install` to install all needed node modules
- open the `JobCannon.sln` file in visual studio, and start the debugger on localhost:5001
- Open a new SQL query and run both the Table data and seed data files.
- open a separate terminal window and open `JobCannon/client` folder
- run `npm start` to host app on localhost:3000

## Usage

To get the best experience from JobCannon in it's early stages, it's best to use an established account as the chat, job lisings, and resume features will not be populated without any matches. For an account with multiple matches, use the credentials in step two.

### Test an Established Job Seeker Account

1. Click the "Login" button on the home page.
2. Login with email: "charlie@paddyspub.comx" and password: "nitecroller"
3. On the `Discovery` page, browse through employers and click either "Hard Pass" to pass on a company or "Let's Talk" to indicate your interest in connecting with that company.
4. Navigate to the `Profile` feature by clicking the profile button on the navbar.
5. Click edit profile to change text field details, or upload a new profile picture. Click "Save Changes"
6. Back on the profile page, you have the option to delete the profile at the bottom. Do not delete the profile at this time.
7. Navigate to the `Chat` feature by clicking the chat button on the navbar.
8. Open a chat by clicking anywhere over a chat row.
9. Write a new message, then click the back arrow. The last message in the conversation appears in preview.
10. Click on chat again, then click the other company's logo to navigate to their profile.
11. Click unmatch if you wish to delete the match and chat with this user.
12. Click the `Jobs` icon on the navbar
13. Select a company to view their job listings.
14. Click "View Job" on one of the cards to open a detailed view.
15. Navigate to the `Resume` feature by clicking the resume button on the navbar.
16. Add a new work history card or edit a current one. Edit skills. Add a new school or edit a current one.
17. Click View Resume to see the view displayed for an employer account.


### Test an Established Employer Account

1. Click the "Login" button on the home page.
2. Login with email: "warren.vidic@abstergo.comx" and password: "nitecroller"
3. On the `Discovery` page, browse through job seekers and click either "Hard Pass" to pass on a company or "Let's Talk" to indicate your interest in connecting with that job seeker.
4. Navigate to the `Profile` feature by clicking the profile button on the navbar.
5. Click edit profile to change text field details, or upload a new profile picture. Click "Save Changes"
6. Back on the profile page, you have the option to delete the profile at the bottom. Do not delete the profile at this time.
7. Navigate to the `Chat` feature by clicking the chat button on the navbar.
8. Open a chat by clicking anywhere over a chat row.
9. Write a new message, then click the back arrow. The last message in the conversation appears in preview.
10. Click on chat again, then click the other job seeker's picture to navigate to their profile.
11. Click unmatch if you wish to delete both your match and chat with this user.
12. Click the `Jobs` icon on the navbar.
13. Add, edit, or delete a new job listing to your profile.
14. Navigate to the `Resume` feature by clicking the resume button on the navbar.
15. Select a user to view their resume.
