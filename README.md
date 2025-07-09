ReliefNet
Problem Statement
In rural India, disasters like floods, cyclones, and earthquakes happen very often. People do not know how to ask for help, NGOs do not know exactly where to send resources, and volunteers do not know where they should go. Because of this, some areas receive too many resources, some get nothing, and relief work gets delayed. Volunteers are not used properly, and many people continue to suffer without timely help.

Solution
ReliefNet is a web-based platform that connects villagers, NGOs, volunteers, and the government on one system. It allows real-time help requests, resource sharing, task assignment to volunteers, and transparent tracking of all activities. The platform also works offline so that people without continuous internet can still ask for help and update data.

How the website works
Landing Page
The first page any visitor sees is the landing page. It introduces ReliefNet and explains what it does in simple words. It shares information about the problem, how ReliefNet solves it, and encourages people to join as a volunteer, NGO, or donor. It highlights key features and builds trust before a user enters the main site.

Home Page
The home page shows an overview of all important data. It displays the total number of SOS requests, missing person reports, available resources, active volunteers, and active NGOs. It also has a map showing relief camps, shelters, food centers, and medical camps. Visitors can also see donation options and choose to support a specific NGO or the admin directly.

Dashboards
There are four dedicated dashboards in the system.

Victim Dashboard
Victims can register using their mobile number, name, email ID, Aadhaar number, and date of birth. Inside the victim dashboard, they can submit SOS requests, see maps with nearby shelters, medical camps, and food centers. They can also see the availability of resources and track where work has already been done.

Volunteer Dashboard
Volunteers sign up by providing their full name, email, password, mobile number, skills (such as first aid, driving), and location. In their dashboard, volunteers can submit SOS or missing reports, see which volunteers have been assigned to which tasks and locations, check remaining resources and where they need to be delivered, and view their own team details. Volunteers can also contact other team members directly.

NGO Dashboard
NGOs register by giving their organization details, such as name, email, phone number, and registration number. After logging in, NGOs can see all SOS and missing reports, understand where work is needed, and accept tasks that they want to handle. Once they accept a task, they can manage the work for that area. This system makes sure that the right number of people and resources reach the right locations and avoids overcrowding or duplication.

Admin Dashboard
Only selected users get access to the admin dashboard. Admin accounts are not open for public registration and are given manually. In this dashboard, admins can see all data including SOS and missing reports, details of all volunteers, team assignments, and the current work of each NGO. Admins manage all volunteer teams, decide which team goes where, and assign tasks accordingly. Admins also handle resource management and track donations. They can see who donated, how much, to which NGO or to the admin directly, and maintain full transparency.

Donation System
Anyone can donate through the website. Donors can choose to support a specific NGO or the overall admin-managed relief fund. The donation section shows all donation history clearly, including the name of the donor, the amount, the receiver (NGO or admin), and the date and time. This ensures complete transparency and trust


Checkpoints Explanation
Checkpoint 1: Landing Page (Completed at 1:00 PM)
We completed the full landing page, which includes the following sections:

Navbar for navigation links

Hero section introducing the website with a clear message

Key features section to highlight important functionalities

About this website section explaining the purpose and vision

Footer with important links and contact information

How it works popup button for quick guidance on the website’s process

Technology used section mentioning HTML, CSS, and JavaScript

The entire landing page was built using HTML for structure, CSS for styling, and JavaScript for interactivity.

Checkpoint 2: Login and Signup Forms (Completed at 2:12 PM)
We added both login and signup forms to the website.
At this stage, the forms were static — they were integrated into the site design but not yet connected to any backend authentication. This step focused on creating the user interface and collecting basic input data visually.

Checkpoint 3: Firebase Authentication Integration (Completed at 4:15 PM)
We implemented login and signup authentication using Firebase services.
In this step, both forms were connected to Firebase Authentication to allow real user registration and login functionality. This included creating user accounts securely and managing login sessions.

Checkpoint 4: Victim Dashboard and Realtime Database (Completed)
We completed the victim dashboard, where registered victims can submit SOS requests and view important information.
Additionally, we integrated Firebase Realtime Database to store victim data securely. Victims can now see maps, available resources, and active relief activities.

Checkpoint 5: Volunteer Authentication and Basic Dashboard UI (Completed)
We added authentication for volunteers so they can register and log in securely.
We also created a basic UI for the volunteer dashboard, where volunteers can view assigned tasks, submit reports, and check team details.
This initial design sets the foundation for further enhancements, including task assignment, resource tracking, and detailed volunteer management.


Checkpoint 6: Volunteer Dashboard Features (Completed)
In this checkpoint, we completed and connected the full Volunteer Dashboard with Firebase Realtime Database and storage integration.

The dashboard now includes the following features:

A personalized welcome message to motivate volunteers:
"Welcome, Volunteer! Empower your community. Track your impact. Take action now."

My Team Section:
Volunteers can see their team name, team lead, region, and list of all team members. This makes it easier to understand who they are working with.

Update Available Resources Section:
Volunteers can submit the type of resources they have (for example, water or food), the quantity, and their location. This information is stored in the Realtime Database and updates are shown instantly.

Available Resources List:
Volunteers can view all resources already added, including type, quantity, location, and when they were added. This helps track supplies and plan distribution.

Assigned Tasks Section:
This section will display tasks assigned to the volunteer. Currently, no tasks are assigned.

Upcoming Tasks & Alerts Section:
Volunteers can read today’s important updates and plans. For example, "Focus on food distribution and medical support in affected villages," along with scheduled activities like checking water supply and team briefings.

Assigned Locations Map:
A placeholder map area is included, which will show assigned locations and nearby relief points.

Request Additional Resources Section:
Volunteers can request more resources by specifying the type, quantity, and a short message explaining why they need it. This request is saved in the database for admin review.

Performance Tracker:
Volunteers can see how many tasks they have completed, how many people they have helped, and view badges or achievements. Currently, both tasks completed and people helped are at zero.

Upload Proof of Task Completion:
Volunteers can upload images or files as proof after finishing a task. This adds transparency and helps with accountability.

All of these features are now integrated with Firebase Realtime Database and storage, so data is saved securely and updates happen in real-time.

This checkpoint makes the Volunteer Dashboard fully functional and ready for practical use, allowing volunteers to manage their activities, track resources, stay updated with alerts, and actively participate in the relief operations.



Checkpoint 7: Admin Login and Authentication (Completed)
In this checkpoint, I added the login form for the admin panel and completed the full authentication process for admin users. I also tested all login functionalities to make sure data is being stored and verified properly in the database. During this commit, I checked that all login data flows work correctly and confirmed that the system is storing and retrieving information as expected without any errors. This ensures that only authorized admins can access the dashboard securely.


Day 2, Checkpoint 1: Admin Dashboard Data Integration
In this checkpoint, I added all the necessary sections to the admin dashboard, including the SOS section, missing reports section, and volunteer management section. I also tested the database connections to make sure that all data is properly imported from Firebase to the admin dashboard. Everything is now working as expected, and the data displays correctly in each section, allowing the admin to easily monitor and manage reports and volunteers in real time.

Day 2, Checkpoint 2: Team Management Section
In this checkpoint, I added the team management section to the admin dashboard. This new section allows the admin to view all teams, see team members' details, and manage or assign teams to specific tasks and locations. It helps the admin organize volunteers more effectively and makes overall coordination much easier.


Day 2, Checkpoint 3: NGO Dashboard
In this checkpoint, I completed building the NGO dashboard and finished the authentication system for NGOs. I also added the SOS section, missing reports section, and the accepted tasks section. Now, NGOs can log in securely, view and manage SOS and missing reports, and track the tasks they have accepted. This makes it easier for NGOs to organize their work and respond quickly to the most urgent needs.

Day 2, Checkpoint 4: All Dashboards Completed
In this checkpoint, I finished adding all the important sections to every dashboard, including the landing page, victim dashboard, volunteer dashboard, NGO dashboard, and admin dashboard. In the admin dashboard, I added the relief centers map feature, where the admin can create and locate food centers, shelters, and medical camps. These locations will also be visible to victims and volunteers so they can find help easily. The admin can also manage and add all resources directly from the dashboard. In the NGO dashboard, I added the donation section so NGOs can track and manage donations. I have completed and integrated all other important features across the dashboards, making the platform fully functional and ready for end-to-end use.

