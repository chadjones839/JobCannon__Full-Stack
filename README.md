# JobCannon

JobCannon is a React app built with full CRUD functionality that lets users register as either an employer or a job seeker, browse user profiles (job seekers browse employers and vice versa), and create connections when there is a shared interest between users. The main match-based feature is also accompanied with a private chat, resume builder, and job listings feature.

The main feature can be found on the `Discovery` page, which is where users are directed after login or account registration. Depending on the user type, a job seeker will be displayed all employer profiles and an employer will be displayed all job seeker profiles. Each profile card has a pair of buttons for "Hard Pass" and "Let's Talk". Clicking the Hard Pass button will remove that user from the active user's list of potential matches. Clicking the Let's Talk button can do either of two things:

1. If the active user clicks "Let's Talk" and there isn't already a partial match in the database, a new partial match is created.

2. If a partial match exists, meaning the other user has already clicked "Let's Talk" on the active user's profile, then the partial match is updated to a complete match, and a new chat is created.

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

<img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1597609592/techtok/home-sample_zboksi.png" height="303" width="133"><img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1597609622/techtok/discovery-sample_fjfooo.png" height="303" width="133"><img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1597609653/techtok/profile-sample_cgosjc.png" height="303" width="133">

<img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1597609578/techtok/chat-sample_q7wjro.png" height="303" width="133"><img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1597609608/techtok/resume-sample_cfitg4.png" height="303" width="133"><img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1597609563/techtok/jobs-sample_fyibaa.png" height="303" width="133">

## Installation

- In your terminal run git clone SSH KEY
- cd into the JobCannon folder
- In your terminal, run `npx create-react-app .` to install React library
- Then run `npm install --save react-router-dom`
- After installations, run `npm start` to host app on localhost:3000
- In browser, open dev tools and view in iPhone X format. (currently only supported for this device's dimensions)
- Then start a json server on port 5002 for sample.json

## Usage

To get the best experience from JobCannon in it's early stages, it's best to use an established account as the chat, job lisings, and resume features will not be populated without any matches. For an account with multiple matches, use the credentials in step two.

### Test an Established Job Seeker Account

1. Click the "Login" button on the home page.
2. Login with email: "charlie@paddyspub.com" and password: "nitecroller"
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
2. Login with email: "hiring@spacerschoice.com" and password: "spacer"
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